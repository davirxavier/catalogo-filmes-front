import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {UsuarioPutDTO, UsuarioVO} from './entities/usuario';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService
{
  private url = environment.apiBaseUrl + environment.usuarioUri;

  constructor(private http: HttpClient) { }

  getUsuario(id: number): Observable<UsuarioVO>
  {
    return this.http.get<UsuarioVO>(this.url + '/' + id);
  }

  getUsuarios(): Observable<Array<UsuarioVO>>
  {
    return this.http.get<Array<UsuarioVO>>(this.url);
  }

  updateUsuario(id: number, usuario: UsuarioPutDTO): Observable<any>
  {
    return this.http.put(this.url + '/' + id, usuario);
  }

  createUsuario(usuario: UsuarioVO): Observable<any>
  {
    return this.http.post(this.url, usuario);
  }
}
