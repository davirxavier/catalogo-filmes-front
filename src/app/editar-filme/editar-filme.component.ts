import { Component, OnInit } from '@angular/core';
import {FilmeVO} from '../entities/filme';
import {ActivatedRoute, Router} from '@angular/router';
import {FilmeService} from '../filme.service';
import {LoadingService} from '../loading.service';
import {handle400Error, handleConnectionError} from '../util/errorhandling';
import {TranslateService} from '@ngx-translate/core';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-editar-filme',
  templateUrl: './editar-filme.component.html',
  styleUrls: ['./editar-filme.component.sass']
})
export class EditarFilmeComponent implements OnInit
{
  filme: FilmeVO;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private filmeService: FilmeService,
              private loadingService: LoadingService,
              private translate: TranslateService,
              private toastr: ToastrService)
  {
  }

  ngOnInit(): void
  {
    this.loadingService.loading = true;

    this.route.params.subscribe(params =>
    {
      const id = params.id;
      if (!isNaN(+id))
      {
        const obs = this.filmeService.getFilme(id);
        obs.subscribe(filme => this.filme = filme);

        handleConnectionError(obs, this.translate, this.toastr, this.router);
      }
      else
      {
        this.router.navigate(['gerencia/filmes']);
      }

      this.loadingService.loading = false;
    });
  }

  onSubmitForm(data: FilmeVO): void
  {
    this.loadingService.loading = true;

    const obs = this.filmeService.updateFilme(data, data.id);
    obs.subscribe(() =>
    {
      this.router.navigate(['gerencia/filmes']);
      this.toastr.success(this.translate.instant('filme.filme_edited'));
      this.loadingService.loading = false;
    }, () =>
    {
      this.loadingService.loading = false;
    });

    handle400Error(obs, this.translate, this.toastr);
    handleConnectionError(obs, this.translate, this.toastr, this.router);
  }
}
