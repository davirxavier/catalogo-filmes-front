import {Component, OnChanges, OnInit} from '@angular/core';
import {FilmeVO} from '../entities/filme';
import {FilmeService} from '../filme.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {ResizedEvent} from 'angular-resize-event';
import {filmeComponentHeight, filmeComponentWidth} from '../filme-item/filme-item.component';
import {Router} from '@angular/router';
import {handleConnectionError} from '../util/errorhandling';
import {LoadingService} from '../loading.service';
import {FilmeSearchService, SearchMessage} from '../filme-search.service';
import {ComponentStateService, Saveable, SaveableData} from '../component-state.service';
import {last} from 'rxjs/operators';

@Component({
  selector: 'app-catalogo-listafilme',
  templateUrl: './catalogo-listafilme.component.html',
  styleUrls: ['./catalogo-listafilme.component.sass']
})
export class CatalogoListafilmeComponent extends Saveable implements OnInit, OnChanges
{
  pageSize: number;
  currentPage: number;
  totalItemsCount: number;
  filmes: Array<FilmeVO> = [];
  private lastSearch: {text: string, key: string} = null;
  readonly filmeLayoutMargin = 16;

  constructor(private filmeService: FilmeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              private loadingService: LoadingService,
              private searchService: FilmeSearchService,
              stateService: ComponentStateService)
  {
    super(stateService);
    this.currentPage = 0;
    this.pageSize = 0;
    this.totalItemsCount = 0;
  }

  ngOnInit(): void
  {
    super.ngOnInit();
    if (this.lastSearch)
    {
      this.onSearch(this.lastSearch.text, this.lastSearch.key);
    }
    else
    {
      this.updateFilmes();
    }

    this.translate.onLangChange.subscribe(() =>
    {
      if (this.router.url === '/filmes')
      {
        this.onPageChange(this.currentPage);
      }
    });

    this.searchService.onSearch().subscribe((event: SearchMessage) =>
    {
      this.onSearch(event.searchText, event.attrKey);
    });
    this.searchService.onClearSearch().subscribe(() =>
    {
      this.lastSearch = null;
      this.updateFilmes();
    });
  }

  private onSearch(text: string, key: string): void
  {
    this.updateFilmes(text, key);
  }

  private updateFilmes(text: string = null, key: string = null): void
  {
    if (text && key)
    {
      this.lastSearch = {text, key};
    }

    const sinopse = (key === 'sinopse') ? text : '';
    const titulo = (key === 'titulo') ? text : '';
    const ano = (key === 'anoLancamento') ? text : '-1';

    this.loadingService.loading = true;
    const obs = this.filmeService.getPagedFilmes(
      this.currentPage - 1,
      this.pageSize, {titulo, sinopse, anoLancamento: ano});
    obs.subscribe(res =>
    {
      this.filmes = res.content;
      this.totalItemsCount = res.totalElements;
      this.loadingService.loading = false;

      super.ngOnChanges();
    });

    handleConnectionError(obs, this.translate, this.toastr, this.router);
  }

  onPageChange(event): void
  {
    this.currentPage = event;

    if (this.lastSearch)
    {
      this.updateFilmes(this.lastSearch.text, this.lastSearch.key);
    }
    else
    {
      this.updateFilmes();
    }
  }

  onResize(event: ResizedEvent): void
  {
    const w = event.element.nativeElement.offsetWidth;
    const ratio = 0.000;
    const h = event.element.nativeElement.offsetHeight;

    let columnCount = Math.floor(w / (filmeComponentWidth + this.filmeLayoutMargin * 2) - ratio);
    columnCount = Math.max(columnCount, 1);
    let rowCount = Math.floor(h / (filmeComponentHeight + this.filmeLayoutMargin));
    rowCount = Math.max(rowCount, 1);
    const newPageSize = columnCount * rowCount;

    if (newPageSize !== this.pageSize)
    {
      const newCurrentPage = Math.floor((this.pageSize * this.currentPage) / newPageSize);

      this.pageSize = newPageSize;
      this.onPageChange(newCurrentPage);
    }
  }

  filmeMargins(): any
  {
    return {
      'margin-left': this.filmeLayoutMargin + 'px',
      'margin-right': this.filmeLayoutMargin + 'px',
      'margin-top': this.filmeLayoutMargin + 'px'
    };
  }

  // State Saving
  getSaveableData(): SaveableData
  {
    return {
      data: {
        pageSize: this.pageSize,
        currentPage: this.currentPage,
        totalItemsCount: this.totalItemsCount,
        lastSearch: this.lastSearch
      }
    };
  }

  getSaveableDataKey(): string
  {
    return 'listafilmes';
  }
}
