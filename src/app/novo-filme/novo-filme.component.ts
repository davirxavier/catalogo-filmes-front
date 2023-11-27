import { Component, OnInit } from '@angular/core';
import {CategoriaService} from '../categoria.service';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {LoadingService} from '../loading.service';
import {CategoriaVO} from '../entities/categoria';
import {handle400Error, handleConnectionError} from '../util/errorhandling';
import {FilmeVO} from '../entities/filme';
import {FilmeService} from '../filme.service';
import {getDateFormattedForDB} from '../util/string';

@Component({
  selector: 'app-novo-filme',
  templateUrl: './novo-filme.component.html',
  styleUrls: ['./novo-filme.component.sass']
})
export class NovoFilmeComponent implements OnInit {

  constructor(private filmeService: FilmeService,
              private translate: TranslateService,
              private toastr: ToastrService,
              private router: Router,
              private loadingService: LoadingService) { }

  ngOnInit(): void
  {
  }

  onSubmitForm(data: FilmeVO): void
  {
    this.loadingService.loading = true;

    const obs = this.filmeService.createFilme(data);
    obs.subscribe(() =>
    {
      this.router.navigate(['gerencia/filmes']);
      this.toastr.success(this.translate.instant('filme.filme_register'));

      this.loadingService.loading = false;
    }, () =>
    {
      this.loadingService.loading = false;
    });

    handle400Error(obs, this.translate, this.toastr);
    handleConnectionError(obs, this.translate, this.toastr, this.router, false, '', false);
  }

}
