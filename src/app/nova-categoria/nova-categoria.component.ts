import { Component, OnInit } from '@angular/core';
import {CategoriaVO} from '../entities/categoria';
import {CategoriaService} from '../categoria.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {handle400Error, handleConnectionError} from '../util/errorhandling';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['./nova-categoria.component.sass']
})
export class NovaCategoriaComponent implements OnInit
{
  constructor(private categoriaService: CategoriaService,
              private translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              private loadingService: LoadingService) { }

  ngOnInit(): void
  {
  }

  onSubmitForm(data: CategoriaVO): void
  {
    this.loadingService.loading = true;

    const obs = this.categoriaService.createCategoria(data);
    obs.subscribe(() =>
    {
      this.router.navigate(['gerencia/categorias']);
      this.toastr.success(this.translate.instant('categoria.categoria_register'));

      this.loadingService.loading = false;
    }, () =>
    {
      this.loadingService.loading = false;
    });

    handle400Error(obs, this.translate, this.toastr);
    handleConnectionError(obs, this.translate, this.toastr, this.router, true, 'gerencia/novacategoria');
  }
}
