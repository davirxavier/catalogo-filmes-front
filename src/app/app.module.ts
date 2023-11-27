import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoNavbarComponent } from './catalogo-navbar/catalogo-navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {ExtendedModule, FlexModule} from '@angular/flex-layout';
import {MatListModule} from '@angular/material/list';
import { CatalogoDropdownComponent } from './catalogo-dropdown/catalogo-dropdown.component';
import {OutsideClickDirective} from './directives/clickOutside';
import { CatalogoListafilmeComponent } from './catalogo-listafilme/catalogo-listafilme.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilmeItemComponent } from './filme-item/filme-item.component';
import { CatalogoListacategoriaComponent } from './catalogo-listacategoria/catalogo-listacategoria.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {NgxPaginationModule} from 'ngx-pagination';
import { CategoriaSliderComponent } from './categoria-slider/categoria-slider.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ToastrModule} from 'ngx-toastr';
import {AngularResizedEventModule} from 'angular-resize-event';
import { PaginaErroComponent } from './pagina-erro/pagina-erro.component';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatTooltipModule} from '@angular/material/tooltip';
import { PaginaFilmeComponent } from './pagina-filme/pagina-filme.component';
import { PaginaLoginComponent } from './pagina-login/pagina-login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {JwtModule} from '@auth0/angular-jwt';
import { PaginaHomeComponent } from './pagina-home/pagina-home.component';
import {LoginGuard} from './util/loginguard';
import { PaginaPreferenciasComponent } from './pagina-preferencias/pagina-preferencias.component';
import {ReactiveFormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {AuthInterceptor} from './auth.interceptor';
import {_configFactory, IConfig, initialConfig, MaskService, NgxMaskModule} from 'ngx-mask';
import { PaginaGerenciarUsuariosComponent } from './pagina-gerenciar-usuarios/pagina-gerenciar-usuarios.component';
import {MatTableModule} from '@angular/material/table';
import { CatalogoTableComponent } from './catalogo-table/catalogo-table.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { NovoUsuarioComponent } from './novo-usuario/novo-usuario.component';
import { UsuarioFormComponent } from './usuario-form/usuario-form.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { PaginaGerenciarCategoriasComponent } from './pagina-gerenciar-categorias/pagina-gerenciar-categorias.component';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { NovaCategoriaComponent } from './nova-categoria/nova-categoria.component';
import { EditarCategoriaComponent } from './editar-categoria/editar-categoria.component';
import { CatalogoSearchBarComponent } from './catalogo-search-bar/catalogo-search-bar.component';
import { PaginaGerenciarFilmesComponent } from './pagina-gerenciar-filmes/pagina-gerenciar-filmes.component';
import { FilmeFormComponent } from './filme-form/filme-form.component';
import { NovoFilmeComponent } from './novo-filme/novo-filme.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MaterialFileInputModule} from 'ngx-material-file-input';
import { EditarFilmeComponent } from './editar-filme/editar-filme.component';
import {LangInterceptor} from './lang.interceptor';

export function TranslateLoaderFactory(http: HttpClient)
{
  return new TranslateHttpLoader(http);
}

export function MaskServiceFactory()
{
  const elementRef = {nativeElement: { value: '' }};
  return new MaskService(document, initialConfig, elementRef, undefined);
}

const maskConfig: Partial<IConfig> = {
  validation: true,
};

@NgModule({
  declarations: [
    AppComponent,
    CatalogoNavbarComponent,
    CatalogoDropdownComponent,
    OutsideClickDirective,
    CatalogoListafilmeComponent,
    FilmeItemComponent,
    CatalogoListacategoriaComponent,
    CategoriaSliderComponent,
    PaginaErroComponent,
    PaginaFilmeComponent,
    PaginaLoginComponent,
    PaginaHomeComponent,
    PaginaPreferenciasComponent,
    PaginaGerenciarUsuariosComponent,
    CatalogoTableComponent,
    NovoUsuarioComponent,
    UsuarioFormComponent,
    EditarUsuarioComponent,
    PaginaGerenciarCategoriasComponent,
    CategoriaFormComponent,
    NovaCategoriaComponent,
    EditarCategoriaComponent,
    CatalogoSearchBarComponent,
    PaginaGerenciarFilmesComponent,
    FilmeFormComponent,
    NovoFilmeComponent,
    EditarFilmeComponent
  ],
    imports: [
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatSidenavModule,
        MatButtonModule,
        MatIconModule,
        FlexModule,
        ExtendedModule,
        MatListModule,
        NgbModule,
        SwiperModule,
        NgxPaginationModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: TranslateLoaderFactory,
                deps: [HttpClient]
            }
        }),
        MatProgressSpinnerModule,
        ToastrModule.forRoot({
            maxOpened: 1,
            autoDismiss: true,
            preventDuplicates: true,
            countDuplicates: true,
            resetTimeoutOnDuplicate: true
        }),
        AngularResizedEventModule,
        MatRippleModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        MatSelectModule,
        NgxMaskModule.forRoot(maskConfig),
        MatTableModule,
        MatSlideToggleModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MaterialFileInputModule
    ],
  providers: [
    LoginGuard,
    {
      provide: MaskService,
      useFactory: MaskServiceFactory
    },
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: HTTP_INTERCEPTORS, useClass: LangInterceptor, multi: true },
    MatDatepickerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
