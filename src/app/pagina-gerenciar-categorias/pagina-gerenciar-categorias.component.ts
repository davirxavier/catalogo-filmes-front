import { Component, OnInit } from '@angular/core';
import {TableColumn} from '../catalogo-table/catalogo-table.component';
import {CategoriaVO} from '../entities/categoria';
import {TranslateService} from '@ngx-translate/core';
import {handleConnectionError} from '../util/errorhandling';
import {CategoriaService} from '../categoria.service';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LoadingService} from '../loading.service';
import {cloneProperties} from '../util/objects';
import {take} from 'rxjs/operators';
import * as moment from 'moment';
import {ComponentStateService, Saveable, SaveableData} from '../component-state.service';
import {stringComparatorUppercase} from '../util/string';

@Component({
  selector: 'app-pagina-gerenciar-categorias',
  templateUrl: './pagina-gerenciar-categorias.component.html',
  styleUrls: ['./pagina-gerenciar-categorias.component.sass']
})
export class PaginaGerenciarCategoriasComponent extends Saveable implements OnInit
{
  currentPage = 1;
  pageSize = 10;
  categorias: Array<CategoriaVO> = [];
  cols: Array<TableColumn> = [];
  private colsTranslate: Array<string> = [
    'categoria.nome',
    'categoria.tag'
  ];
  private colKeys: Array<string> = [
    'nome',
    'tag'
  ];

  constructor(private translate: TranslateService,
              private categoriaService: CategoriaService,
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
    this.updateCategorias();
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

  updateCategorias(): void
  {
    this.loadingService.loading = true;

    const obs = this.categoriaService.getAllCategorias();
    obs.subscribe(res =>
    {
      this.categorias = res;

      this.categorias.forEach((cat) =>
      {
        cat.desativado = !cat.desativado;
      });

      this.categorias = this.categorias.sort((c1, c2) =>
      {
        return stringComparatorUppercase(c1.nome, c2.nome);
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
    const i = (this.pageSize * (this.currentPage - 1)) + index;
    this.router.navigate(['gerencia/editarcategoria', this.categorias[i].id]);
  }

  onDesativarClick(index: number): void
  {
    const i = (this.pageSize * (this.currentPage - 1)) + index;
    const categoria = this.categorias[i];
    const categoriaDto: CategoriaVO = cloneProperties(categoria) as CategoriaVO;
    categoriaDto.desativado = !categoriaDto.desativado;

    this.categoriaService.updateCategoria(categoriaDto, categoriaDto.id).subscribe(() =>
    {
    }, err =>
    {
      console.error(err);
      this.toastr.error(this.translate.instant('error.connection_error_retry'),
        this.translate.instant('error.connection_error'));

      categoria.desativado = !categoria.desativado;
    });
  }

  onPageChanged(): void
  {
    super.ngOnChanges();
  }

  getSaveableData(): SaveableData
  {
    return {
      data: {
        currentPage: this.currentPage
      }
    };
  }

  getSaveableDataKey(): string
  {
    return 'gerencia-categorias';
  }
}
