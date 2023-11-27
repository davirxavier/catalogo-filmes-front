import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../usuario.service';
import {UsuarioFormData} from '../usuario-form/usuario-form.component';
import {UsuarioVO} from '../entities/usuario';
import {Idioma} from '../entities/idioma';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {error400AsString} from '../util/errorhandling';
import {TranslateService} from '@ngx-translate/core';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.sass']
})
export class NovoUsuarioComponent implements OnInit
{
  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private toastr: ToastrService,
              private translate: TranslateService,
              private loadingService: LoadingService) { }

  ngOnInit(): void
  {
  }

  onSubmitForm(data: UsuarioFormData): void
  {
    this.loadingService.loading = true;

    const usuario: UsuarioVO = {
      cpf: data.cpf,
      desativado: false,
      email: data.email,
      id: -1,
      idioma: { id: data.idioma.id } as Idioma,
      nome: data.nome,
      perfil: '',
      senha: data.senhaNova,
      telefone: data.telefone,
      username: data.username
    };
    this.usuarioService.createUsuario(usuario).subscribe(res =>
    {
      this.router.navigate(['/gerencia/usuarios']);
      this.toastr.success(this.translate.instant('manage_page.usuario_register'));

      this.loadingService.loading = false;
    }, err =>
    {
      console.error(err);
      const errorstr = error400AsString(err, this.translate.instant('error.invalid'));
      this.toastr.error(errorstr, this.translate.instant('error.error'), { enableHtml: true });

      this.loadingService.loading = false;
    });
  }
}
