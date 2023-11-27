import { Component, OnInit } from '@angular/core';
import {UsuarioService} from '../usuario.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {UsuarioFormData} from '../usuario-form/usuario-form.component';
import {UsuarioPutDTO, UsuarioVO} from '../entities/usuario';
import {Idioma} from '../entities/idioma';
import {error400AsString} from '../util/errorhandling';
import {LoadingService} from '../loading.service';

@Component({
  selector: 'app-editar-usuario',
  templateUrl: './editar-usuario.component.html',
  styleUrls: ['./editar-usuario.component.sass']
})
export class EditarUsuarioComponent implements OnInit
{
  usuario: UsuarioVO;

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private route: ActivatedRoute,
              private toastr: ToastrService,
              private translate: TranslateService,
              private loadingService: LoadingService) { }

  ngOnInit(): void
  {
    this.loadingService.loading = true;

    this.route.params.subscribe(params =>
    {
      const id = params.id;
      if (id)
      {
        // TODO Error handling
        this.usuarioService.getUsuario(id).subscribe(usuario =>
        {
          this.usuario = usuario;
          this.loadingService.loading = false;
        });
      }
    });
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
