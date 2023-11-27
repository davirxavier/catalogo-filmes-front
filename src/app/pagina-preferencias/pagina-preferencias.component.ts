import {Component, Input, OnInit} from '@angular/core';
import {UsuarioPutDTO, UsuarioVO} from '../entities/usuario';
import {AuthService} from '../auth.service';
import {Form, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {LANGUAGES} from '../app.component';
import {Idioma} from '../entities/idioma';
import {UsuarioService} from '../usuario.service';
import {ToastrService} from 'ngx-toastr';
import {error400AsString} from '../util/errorhandling';
import {TranslateService} from '@ngx-translate/core';
import {isStringEmpty} from '../util/string';
import {withoutProperty, withProperty} from '../util/objects';
import {environment} from '../../environments/environment';
import {UsuarioFormData} from '../usuario-form/usuario-form.component';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-pagina-preferencias',
  templateUrl: './pagina-preferencias.component.html',
  styleUrls: ['./pagina-preferencias.component.sass']
})
export class PaginaPreferenciasComponent implements OnInit
{
  usuario: UsuarioVO;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private toastr: ToastrService,
              private translate: TranslateService,
              private loadingService: LoadingService)
  {
    authService.getCurrentUser().subscribe(usuario =>
    {
      this.usuario = usuario;
    });
  }

  ngOnInit(): void
  {
  }

  onSubmitForm(data: UsuarioFormData): void
  {
    this.loadingService.loading = true;

    const usuario: UsuarioPutDTO = {
      cpf: data.cpf,
      desativado: false,
      email: data.email,
      id: this.usuario.id,
      idioma: { id: data.idioma.id } as Idioma,
      nome: data.nome,
      perfil: '',
      senha: data.senhaNova,
      telefone: data.telefone
    };

    this.usuarioService.updateUsuario(this.usuario.id, usuario).subscribe(res =>
    {
      this.toastr.success(this.translate.instant('manage_page.usuario_register'));
      this.authService.updateCurrentUser();

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
