import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NovoUsuario } from './novo-usuario';

const URL_API = 'http://localhost:3000'

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
