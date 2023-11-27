import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';

@Injectable()
export class AuthInterceptor implements HttpInterceptor
{

  private localStorageName = environment.authLocalStore;
  private authHeader = environment.authHeaderHeader;
  private prefix = environment.authTokenPrefix;

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>
  {
    const token = localStorage.getItem(this.localStorageName);

    if (token)
    {
      const clone = request.clone({
        headers: request.headers.set(this.authHeader,
          this.prefix + token)
      });

      return next.handle(clone);
    }

    return next.handle(request);
  }
}
