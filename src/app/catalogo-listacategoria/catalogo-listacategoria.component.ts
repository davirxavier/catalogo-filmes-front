import {AfterContentInit, Component, OnInit} from '@angular/core';
import {CategoriaVO} from '../entities/categoria';
import {filmeComponentWidth} from '../filme-item/filme-item.component';
import {CategoriaService} from '../categoria.service';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {Router} from '@angular/router';
import {handleConnectionError} from '../util/errorhandling';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-catalogo-listacategoria',
  templateUrl: './catalogo-listacategoria.component.html',
  styleUrls: ['./catalogo-listacategoria.component.sass']
})
export class CatalogoListacategoriaComponent implements OnInit, AfterContentInit
{
  categorias: Array<CategoriaVO> = [];
  filmeWidth = filmeComponentWidth;
  empty = false;
  private categoriaHasFilmeCount = 0;

  constructor(private categoriaService: CategoriaService,
              private toastr: ToastrService,
              private translate: TranslateService,
              private router: Router,
              private loadingService: LoadingService)
  {
  }

  ngOnInit(): void
  {
    this.translate.onLangChange.subscribe(() =>
    {
      if (this.router.url === '/categorias')
      {
        this.updateCategorias();
      }
    });
  }

  ngAfterContentInit(): void
  {
    this.updateCategorias();
  }

  onCategoriaHasFilmes(categoria: CategoriaVO): void
  {
    categoria.hasFilmes = true;

    this.categoriaHasFilmeCount++;
    if (this.categoriaHasFilmeCount >= this.categorias.length - 1)
    {
      this.loadingService.loading = false;
      this.categoriaHasFilmeCount = 0;
    }
  }

  updateCategorias(): void
  {
    this.loadingService.loading = true;
    const obs = this.categoriaService.getCategoriasWithLang();
    obs.subscribe(res =>
    {
      this.categorias = res;

      if (this.categorias.length === 0)
      {
        this.empty = true;
      }
      this.loadingService.loading = false;
    }, () =>
    {
      this.loadingService.loading = false;
    });

    handleConnectionError(obs, this.translate, this.toastr, this.router, true, 'categorias');
  }
}
