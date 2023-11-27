import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from '../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class LangInterceptor implements HttpInterceptor
{
  private langHeader = environment.languageHeader;

  constructor(private translate: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>>
  {
    if (!request.headers.has(this.langHeader) && this.translate.currentLang)
    {
      const clone = request.clone({
        headers: request.headers.set(this.langHeader, this.translate.currentLang)
      });

      return next.handle(clone);
    }

    return next.handle(request);
  }
}
