import { Component, OnInit } from '@angular/core';
import {CategoriaVO} from '../entities/categoria';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaService} from '../categoria.service';
import {LoadingService} from '../loading.service';
import {handle400Error, handleConnectionError} from '../util/errorhandling';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.sass']
})
export class EditarCategoriaComponent implements OnInit
{
  categoria: CategoriaVO = undefined;

  constructor(private route: ActivatedRoute,
              private categoriaService: CategoriaService,
              private loadingService: LoadingService,
              private translate: TranslateService,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void
  {
    this.route.params.subscribe(params =>
    {
      const id = params.id;
      if (id)
      {
        this.categoriaService.getCategoria(id).subscribe(res =>
        {
          this.categoria = res;
        });
      }
    });
  }

  onSubmitForm(data: CategoriaVO): void
  {
    this.loadingService.loading = true;

    const obs = this.categoriaService.updateCategoria(data, data.id);
    obs.subscribe(() =>
    {
      this.router.navigate(['gerencia/categorias']);
      this.toastr.success(this.translate.instant('categoria.categoria_edited'));
      this.loadingService.loading = false;
    }, err =>
    {
      this.loadingService.loading = false;
    });

    handle400Error(obs, this.translate, this.toastr);
    handleConnectionError(obs, this.translate, this.toastr, this.router, true, 'gerencia/categorias');
  }
}
