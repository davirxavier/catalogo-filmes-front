import { Component, OnInit } from '@angular/core';
import {TableColumn} from '../catalogo-table/catalogo-table.component';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LoadingService} from '../loading.service';
import {take} from 'rxjs/operators';
import {handleConnectionError} from '../util/errorhandling';
import {cloneProperties} from '../util/objects';
import {FilmeVO} from '../entities/filme';
import {FilmeService} from '../filme.service';
import {getDateDay, getDateMonth, getDateYear, getDurationFormatted} from '../util/string';
import * as moment from 'moment';
import {ComponentStateService, Saveable, SaveableData} from '../component-state.service';

@Component({
  selector: 'app-pagina-gerenciar-filmes',
  templateUrl: './pagina-gerenciar-filmes.component.html',
  styleUrls: ['./pagina-gerenciar-filmes.component.sass']
})
export class PaginaGerenciarFilmesComponent extends Saveable implements OnInit
{
  filmes: Array<FilmeVO> = [];
  cols: Array<TableColumn> = [];
  currentPage = 1;
  pageSize = 10;
  totalItems = 0;
  private lastSort = 'titulo,asc';
  private colsTranslate: Array<string> = [
    'filme.titulo',
    'filme.dataLancamento',
    'filme.idioma',
    'filme.duracao'
  ];
  private colKeys: Array<string> = [
    'titulo',
    'dataLancamento',
    'idioma',
    'duracao'
  ];

  constructor(private translate: TranslateService,
              private filmeService: FilmeService,
              private toastr: ToastrService,
              private router: Router,
              private loadingService: LoadingService,
              stateService: ComponentStateService)
  {
    super(stateService);
  }

  ngOnInit(): void
  {
    super.ngOnInit();
    this.updateFilmes();
    this.updateColumns();

    this.translate.onLangChange.pipe(take(1)).subscribe(() =>
    {
      this.updateColumns();
    });
  }

  updateColumns(): void
  {
    this.translate.get(this.colsTranslate).subscribe((res: object) =>
    {
      Object.keys(res).forEach((key, i) =>
      {
        this.cols[i] = { name: res[key], propertyKey: this.colKeys[i] };
      });
    });
  }

  updateFilmes(): void
  {
    this.loadingService.loading = true;

    const obs = this.filmeService.getPagedFilmes(this.currentPage - 1, this.pageSize, {sort: this.lastSort, lang: '', desativados: true});
    obs.subscribe(res =>
    {
      this.filmes = res.content;
      this.totalItems = res.totalElements;

      this.filmes.forEach((f) =>
      {
        f.dataLancamento = this.translate.instant('info.filme_date_sm', {
          d: getDateDay(f.dataLancamento, this.translate),
          m: getDateMonth(f.dataLancamento, this.translate),
          y: getDateYear(f.dataLancamento, this.translate)
        });

        f.duracao = getDurationFormatted(f.duracao);
        if (f.idioma)
        {
          f.idioma.toString = () =>
          {
            return f.idioma.tag;
          };
        }

        f.desativado = !f.desativado;
      });

      super.ngOnChanges();
      this.loadingService.loading = false;
    }, () =>
    {
      this.loadingService.loading = false;
    });

    handleConnectionError(obs, this.translate, this.toastr, this.router, true, 'gerencia/usuarios');
  }

  onEditClick(index: number): void
  {
    this.router.navigate(['gerencia/editarfilme', this.filmes[index].id]);
  }

  onDesativarClick(index: number): void
  {
    const filme = this.filmes[index];
    const filmeDto: FilmeVO = cloneProperties(this.filmes[index]) as FilmeVO;
    filmeDto.dataLancamento = moment(filmeDto.dataLancamento, this.translate.instant('info.date_format')).format('yyyy-MM-DD');
    filmeDto.duracao = 'PT' + filmeDto.duracao.toUpperCase();
    filmeDto.desativado = !filmeDto.desativado;

    this.filmeService.updateFilme(filmeDto, filmeDto.id).subscribe(() =>
    {
    }, err =>
    {
      console.error(err);
      this.toastr.error(this.translate.instant('error.connection_error_retry'),
        this.translate.instant('error.connection_error'));

      filme.desativado = !filme.desativado;
    });
  }

  onTablePageChanged(page: number): void
  {
    this.currentPage = page;
    this.updateFilmes();
  }

  onTableSort(sort: string): void
  {
    this.lastSort = sort;
    this.updateFilmes();
  }

  getSaveableData(): SaveableData
  {
    return {
      data: {
        lastSort: this.lastSort,
        currentPage: this.currentPage
      }
    };
  }

  getSaveableDataKey(): string
  {
    return 'gerencia-filmes';
  }
}
