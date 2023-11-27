import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {TranslateService} from '@ngx-translate/core';
import {environment} from '../environments/environment';
import {FilmeVO} from './entities/filme';
import {share} from 'rxjs/operators';

export interface FilmeSearchOptions
{
  sort?: string;
  titulo?: string;
  sinopse?: string;
  anoLancamento?: string;
  desativados?: boolean;
  lang?: string;
}
@Injectable({
  providedIn: 'root'
})
export class FilmeService
{
  private url = environment.apiBaseUrl + environment.filmesUri;
  private langHeader = environment.languageHeader;

  constructor(private http: HttpClient, private translate: TranslateService) { }

  getFilme(id: number): Observable<FilmeVO>
  {
    return this.http.get<FilmeVO>(this.url + '/' + id);
  }

  getPagedFilmes(pageNum: number,
                 pageSize: number,
                 options: FilmeSearchOptions): Observable<any>
  {
    options = options || {};
    options.sort = (options.sort !== undefined) ? options.sort : 'titulo,asc';
    options.desativados = (options.desativados !== undefined) ? options.desativados : false;
    options.titulo = (options.titulo !== undefined) ? options.titulo :  '';
    options.sinopse = (options.sinopse !== undefined) ? options.sinopse :  '';
    options.anoLancamento = (options.anoLancamento !== undefined) ? options.anoLancamento :  '-1';
    options.lang = (options.lang !== undefined) ? options.lang : this.translate.currentLang;

    const params = new HttpParams().append('page', String(pageNum))
      .append('size', String(pageSize))
      .append('sort', options.sort)
      .append('desativados', String(options.desativados))
      .append('titulo', options.titulo)
      .append('sinopse', options.sinopse)
      .append('anoLancamento', options.anoLancamento);
    const headers = new HttpHeaders().set(this.langHeader, options.lang);

    return this.http.get(this.url, {params, headers});
  }

  getPagedFilmesByCategoria(pageNum: number, pageSize: number, categoriaId: number): Observable<any>
  {
    const params = new HttpParams().append('page', String(pageNum))
      .append('size', String(pageSize))
      .append('categoria', String(categoriaId))
      .append('sort', 'titulo,asc');
    const headers = new HttpHeaders().set(this.langHeader, this.translate.currentLang);

    return this.http.get(this.url, {params, headers});
  }

  getAllFilmes(): Observable<any>
  {
    const headers = new HttpHeaders().set(this.langHeader, '');

    return this.http.get(this.url, {headers});
  }

  updateFilme(filme: FilmeVO, id: number): Observable<any>
  {
    return this.http.put(this.url + '/' + id, filme);
  }

  createFilme(filme: FilmeVO): Observable<any>
  {
    return this.http.post(this.url, filme).pipe(share());
  }
}
