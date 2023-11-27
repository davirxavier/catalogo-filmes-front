import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {merge, Observable, of, Subject, Subscriber} from 'rxjs';
import {environment} from '../environments/environment';
import {JwtHelperService} from '@auth0/angular-jwt';
import {TranslateService} from '@ngx-translate/core';
import {UsuarioService} from './usuario.service';
import {UsuarioVO} from './entities/usuario';
import {flatMap, switchMap, take} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService
{
  private url = environment.apiBaseUrl + environment.loginUri;
  private readonly storeName = environment.authLocalStore;
  private readonly jwt = new JwtHelperService();
  private currentUser: UsuarioVO | null;
  onCurrentUserChanged = new Subject<UsuarioVO>();
  private loginObservable = new Subject<void>();

  constructor(private http: HttpClient,
              private translate: TranslateService,
              private usuarioService: UsuarioService)
  {
  }

  login(user: string, password: string): Observable<UsuarioVO>
  {
    const req = this.http.post<any>(this.url, { username: user, senha: password })
      .pipe(take(1), flatMap((res): Observable<UsuarioVO> =>
      {
        const token = res.token;
        this.storeSession(token);

        const decoded = this.jwt.decodeToken(token);
        this.loginObservable.next();
        if (decoded && decoded.id)
        {
          const get = this.usuarioService.getUsuario(decoded.id);
          get.subscribe(usuario =>
          {
            if (usuario && usuario.idioma && usuario.idioma.tag)
            {
              this.translate.use(usuario.idioma.tag);
            }
          });

          return get;
        }

        return of();
      }));

    req.subscribe(usuario =>
    {
      this.currentUser = usuario;
    });

    return req;
  }

  onIsLoggedChange(): Observable<void>
  {
    return this.loginObservable;
  }

  logout(): Observable<any>
  {
    this.currentUser = null;

    this.removeSession();
    return of();
  }

  isLogged(): boolean
  {
    const expired = this.isExpired();
    return !expired;
  }

  isExpired(): boolean
  {
    const token = localStorage.getItem(this.storeName);
    return this.jwt.isTokenExpired(token);
  }

  updateCurrentUser(): void
  {
    const token = localStorage.getItem(this.storeName);
    const decoded = this.jwt.decodeToken(token);

    const ret = this.usuarioService.getUsuario(decoded.id);
    ret.subscribe(res =>
    {
      this.currentUser = res;

      if (this.currentUser && this.currentUser.idioma && this.currentUser.idioma.tag)
      {
        this.translate.use(this.currentUser.idioma.tag);
      }

      this.onCurrentUserChanged.next(this.currentUser);
    });
  }

  getCurrentUser(): Observable<UsuarioVO>
  {
    if (this.currentUser)
    {
      return merge(this.onCurrentUserChanged, of(this.currentUser));
    }
    else if (this.isLogged())
    {
      const token = localStorage.getItem(this.storeName);
      const decoded = this.jwt.decodeToken(token);

      const ret = this.usuarioService.getUsuario(decoded.id);
      ret.subscribe(res =>
      {
        this.currentUser = res;
      });

      return merge(this.onCurrentUserChanged, ret);
    }

    return of(null);
  }

  getExpiry(): Date | null
  {
    const token = localStorage.getItem(this.storeName);
    return this.jwt.getTokenExpirationDate(token);
  }

  private storeSession(token: string): void
  {
    localStorage.setItem(this.storeName, token);
  }

  private removeSession(): void
  {
    localStorage.removeItem(this.storeName);
  }
}
