import {AfterViewChecked, AfterViewInit, Component, OnInit} from '@angular/core';
import {UsuarioPutDTO, UsuarioVO} from '../entities/usuario';
import {TableColumn} from '../catalogo-table/catalogo-table.component';
import {TranslateService} from '@ngx-translate/core';
import {UsuarioService} from '../usuario.service';
import {MaskApplierService, MaskService} from 'ngx-mask';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AuthService} from '../auth.service';
import {handleConnectionError} from '../util/errorhandling';
import {LoadingService} from '../loading.service';
import {take} from 'rxjs/operators';
import {ComponentStateService, Saveable, SaveableData} from '../component-state.service';

@Component({
  selector: 'app-pagina-gerenciar-usuarios',
  templateUrl: './pagina-gerenciar-usuarios.component.html',
  styleUrls: ['./pagina-gerenciar-usuarios.component.sass']
})
export class PaginaGerenciarUsuariosComponent extends Saveable implements OnInit {

  usuarioAtual: UsuarioVO;
  usuarios: Array<UsuarioVO> = [];
  cols: Array<TableColumn> = [];
  currentPage = 1;
  pageSize = 10;
  private readonly telefoneMask = environment.telefoneMask;
  private colsTranslate: Array<string> = [
    'usuario.nome',
    'usuario.email',
    'usuario.username',
    'usuario.telefone'
  ];
  private colKeys: Array<string> = [
    'nome', 'email', 'username', 'telefone'
  ];

  constructor(private translate: TranslateService,
              private mask: MaskService,
              private usuarioService: UsuarioService,
              private authService: AuthService,
              private toastr: ToastrService,
              private loadingService: LoadingService,
              private router: Router,
              stateService: ComponentStateService)
  {
    super(stateService);
  }

  ngOnInit(): void
  {
    super.ngOnInit();
    this.updateUsuarios();
    this.updateColumns();

    this.translate.onLangChange.pipe(take(1)).subscribe(() =>
    {
      this.updateColumns();
    });
  }

  isRowEditable(): (row) => boolean
  {
    return (usuario: UsuarioVO) =>
    {
      return usuario.id !== 1;
    };
  }

  isColumnSortable(): (col) => boolean
  {
    return (column: TableColumn) =>
    {
      return true;
    };
  }

  updateColumns(): void
  {
    this.translate.get(this.colsTranslate).subscribe((res: object) =>
    {
      Object.keys(res).forEach((key, i) =>
      {
        this.cols[i] = {name: res[key], propertyKey: this.colKeys[i]};
      });
    });
  }

  updateUsuarios(): void
  {
    this.loadingService.loading = true;

    this.authService.getCurrentUser().subscribe(user =>
    {
      this.usuarioAtual = user;
    });

    const obs = this.usuarioService.getUsuarios();
    obs.subscribe(res =>
    {
      this.usuarios = res;

      this.usuarios.forEach((usuario) =>
      {
        usuario.telefone = this.mask.applyMask(usuario.telefone, this.telefoneMask);
        usuario.desativado = !usuario.desativado;
      });

      this.usuarios = this.usuarios.sort((u1, u2) =>
      {
        return (u1.nome.toUpperCase() > u2.nome.toUpperCase()) ? 1 : -1;
      });

      super.ngOnChanges();
      this.loadingService.loading = false;
    }, err =>
    {
      this.loadingService.loading = false;
    });

    handleConnectionError(obs, this.translate, this.toastr, this.router, true, 'gerencia/usuarios');
  }

  onEditClick(index: number): void
  {
    const i = (this.pageSize * (this.currentPage - 1)) + index;
    const usuario = this.usuarios[i];
    this.router.navigate(['/gerencia/editarusuario', usuario.id]);
  }

  onDesativarClick(index: number): void
  {
    const i = (this.pageSize * (this.currentPage - 1)) + index;
    const usuario = this.usuarios[i];
    const dto: UsuarioPutDTO = {
      cpf: usuario.cpf,
      desativado: !usuario.desativado,
      email: usuario.email,
      id: usuario.id,
      idioma: usuario.idioma,
      nome: usuario.nome,
      perfil: usuario.perfil,
      senha: '',
      telefone: usuario.telefone
    };

    this.usuarioService.updateUsuario(usuario.id, dto).subscribe(() =>
    {
    }, err =>
    {
      console.error(err);
      this.toastr.error(this.translate.instant('error.connection_error_retry'),
        this.translate.instant('error.connection_error'));

      usuario.desativado = !usuario.desativado;
    });
  }

  onPageChange(): void
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
    return 'gerencia-usuarios';
  }
}
