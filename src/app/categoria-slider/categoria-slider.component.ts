import {
  AfterContentInit,
  Component, ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {FilmePagedListVO} from '../entities/filme';
import {FilmeService} from '../filme.service';
import {TranslateService} from '@ngx-translate/core';
import {ComponentStateService, Saveable, SaveableData} from '../component-state.service';

@Component({
  selector: 'app-categoria-slider',
  templateUrl: './categoria-slider.component.html',
  styleUrls: ['./categoria-slider.component.sass']
})
export class CategoriaSliderComponent extends Saveable implements OnInit, AfterContentInit {

  @Input() readonly filmeComponentWidth: number;
  @Input() readonly categoriaId: number;
  @Output() readonly hasFilmesEvent = new EventEmitter<boolean>();
  @ViewChildren('filmeItem', {read: ElementRef}) filmeItems: QueryList<ElementRef>;
  @ViewChild('filmeContainer') filmeContainer: ElementRef;
  filmesPageable: FilmePagedListVO;
  loading: boolean;
  nextDisabled: boolean;
  prevDisabled: boolean;
  currentPage: number;
  private pageSize: number;
  private lastPageSize: number;
  private screenWidth: number;

  constructor(private filmeService: FilmeService,
              private translate: TranslateService,
              stateService: ComponentStateService)
  {
    super(stateService);

    this.currentPage = 0;
    this.loading = true;
    this.filmesPageable = {
      firstPage: true,
      lastPage: true,
      empty: true,
      pageNumber: 0,
      totalElements: 0,
      totalPages: 0,
      filmes: []
    };
  }

  ngOnInit(): void
  {
    super.ngOnInit();

    this.translate.onLangChange.subscribe(() =>
    {
      this.updateFilmes();
    });
  }

  ngAfterContentInit()
  {
    this.onResize(null);
  }

  onNextClicked(): void
  {
    this.changePage(this.currentPage + 1);
  }

  onPrevClicked(): void
  {
    this.changePage(this.currentPage - 1);
  }

  private changePage(page: number, updateFilmes = true, next: () => void = () => {})
  {
    this.currentPage = page;
    if (this.currentPage < 0)
    {
      this.currentPage = 0;
    }

    if (updateFilmes)
    {
      this.loading = true;
      this.updateFilmes(() =>
      {
        this.prevDisabled = this.filmesPageable.firstPage;
        this.nextDisabled = this.filmesPageable.lastPage;
        this.loading = false;
        next.call(null);
      });
    }
  }

  private updateFilmes(callback: () => void = () => {}): void
  {
    this.filmeService.getPagedFilmesByCategoria(this.currentPage, this.pageSize, this.categoriaId)
      .subscribe(res =>
      {
        this.filmesPageable = {
          firstPage: res.first,
          lastPage: res.last,
          empty: res.empty,
          pageNumber: res.number,
          totalElements: res.totalElements,
          totalPages: res.totalPages,
          filmes: res.content
        };

        if (this.filmesPageable.totalElements > 0)
        {
          this.hasFilmesEvent.emit(true);
        }

        callback.call(null);
        super.ngOnChanges();
      }, error =>
      {
        // TODO Error handling
        return;
      });
  }

  @HostListener('window:resize', ['$event'])
  onResize(event)
  {
    this.screenWidth = window.innerWidth;
    this.pageSize = Math.max(Math.floor(this.screenWidth / this.filmeComponentWidth) - 2, 1);

    if (this.pageSize !== this.lastPageSize)
    {
      if (this.lastPageSize)
      {
        this.currentPage = Math.floor((this.lastPageSize * this.currentPage) / this.pageSize);
      }
      this.changePage(this.currentPage);
    }

    this.lastPageSize = this.pageSize;
  }

  getCurrentPage(): number
  {
    if (this.filmesPageable.totalPages === 0)
    {
      return 0;
    }

    return this.currentPage + 1;
  }

  onInput(event: KeyboardEvent): void
  {
    if (event.code === 'ArrowRight' && this.currentPage + 1 <= this.filmesPageable.totalPages - 1)
    {
      this.changePage(this.currentPage + 1, true, () =>
      {
        setTimeout(() =>
        {
          this.filmeItems.first.nativeElement.firstChild.focus();
        }, 0);
      });
    }
    else if (event.code === 'ArrowLeft' && this.currentPage - 1 >= 0)
    {
      this.changePage(this.currentPage - 1, true, () =>
      {
        setTimeout(() =>
        {
          this.filmeItems.first.nativeElement.firstChild.focus();
        }, 0);
      });
    }
  }

  getSaveableData(): SaveableData
  {
    return {
      data: {
        currentPage: this.currentPage,
      }
    };
  }

  getSaveableDataKey(): string
  {
    return 'categoria-slider-' + this.categoriaId;
  }
}
