import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CatalogoListafilmeComponent} from './catalogo-listafilme/catalogo-listafilme.component';
import {CatalogoListacategoriaComponent} from './catalogo-listacategoria/catalogo-listacategoria.component';
import {PaginaErroComponent} from './pagina-erro/pagina-erro.component';
import {environment} from '../environments/environment';
import {PaginaFilmeComponent} from './pagina-filme/pagina-filme.component';
import {PaginaLoginComponent} from './pagina-login/pagina-login.component';
import {PaginaHomeComponent} from './pagina-home/pagina-home.component';
import {LoginGuard} from './util/loginguard';
import {PaginaPreferenciasComponent} from './pagina-preferencias/pagina-preferencias.component';
import {PaginaGerenciarUsuariosComponent} from './pagina-gerenciar-usuarios/pagina-gerenciar-usuarios.component';
import {NovoUsuarioComponent} from './novo-usuario/novo-usuario.component';
import {EditarUsuarioComponent} from './editar-usuario/editar-usuario.component';
import {PaginaGerenciarCategoriasComponent} from './pagina-gerenciar-categorias/pagina-gerenciar-categorias.component';
import {NovaCategoriaComponent} from './nova-categoria/nova-categoria.component';
import {EditarCategoriaComponent} from './editar-categoria/editar-categoria.component';
import {PaginaGerenciarFilmesComponent} from './pagina-gerenciar-filmes/pagina-gerenciar-filmes.component';
import {NovoFilmeComponent} from './novo-filme/novo-filme.component';
import {EditarFilmeComponent} from './editar-filme/editar-filme.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'filmes',
    pathMatch: 'full'
  },
  {
    path: 'filmes',
    component: CatalogoListafilmeComponent,
  },
  {
    path: 'categorias',
    component: CatalogoListacategoriaComponent
  },
  {
    path: environment.connectionErrorPage + '/:lasturl',
    component: PaginaErroComponent
  },
  {
    path: 'filmes/:id',
    component: PaginaFilmeComponent
  },
  {
    path: 'login',
    component: PaginaLoginComponent
  },
  {
    path: 'conta',
    component: PaginaPreferenciasComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'home',
    component: PaginaHomeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/usuarios',
    component: PaginaGerenciarUsuariosComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/novousuario',
    component: NovoUsuarioComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/editarusuario/:id',
    component: EditarUsuarioComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/categorias',
    component: PaginaGerenciarCategoriasComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/novacategoria',
    component: NovaCategoriaComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/editarcategoria/:id',
    component: EditarCategoriaComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/filmes',
    component: PaginaGerenciarFilmesComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/novofilme',
    component: NovoFilmeComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'gerencia/editarfilme/:id',
    component: EditarFilmeComponent,
    canActivate: [LoginGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
