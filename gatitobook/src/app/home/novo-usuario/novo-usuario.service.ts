import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { NovoUsuario } from './novo-usuario';

const URL_API = environment.url_api

@Injectable({
  providedIn: 'root'
})
export class NovoUsuarioService {

  constructor(
    private http: HttpClient) { }

  cadastraNovoUsuario(novoUsuario: NovoUsuario): Observable<any> {
    return this.http.post(`${URL_API}/user/signup`, novoUsuario)
  }

  verificaUsuario(novoUsuario: string) {
    return this.http.get(`${URL_API}/user/exists/${novoUsuario}`)
  }

}
