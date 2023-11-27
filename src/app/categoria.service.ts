import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../environments/environment';
import {CategoriaVO} from './entities/categoria';
import {share} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService
{
  private url = environment.apiBaseUrl + environment.categoriasUri;
  private langHeader = environment.languageHeader;

  constructor(private translate: TranslateService,
              private http: HttpClient) { }

  getCategoriasWithLang(lang: string = this.translate.currentLang): Observable<any>
  {
    const headers = new HttpHeaders().set(this.langHeader, lang);

    return this.http.get(this.url, {headers});
  }

  getAllCategorias(): Observable<any>
  {
    // Cabeçalho vazio para impedir o browser de setar o accept-lang automaticamente.
    const headers = new HttpHeaders().set(this.langHeader, '');

    return this.http.get(this.url, {headers});
  }

  getCategoria(id: number): Observable<CategoriaVO>
  {
    return this.http.get<CategoriaVO>(this.url + '/' + id);
  }

  createCategoria(categoria: CategoriaVO): Observable<any>
  {
    return this.http.post(this.url, categoria).pipe(share());
  }

  updateCategoria(categoria: CategoriaVO, id: number): Observable<any>
  {
    return this.http.put(this.url + '/' + id, categoria).pipe(share());
  }
}
