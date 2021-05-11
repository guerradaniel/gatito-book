import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais } from './animais';

const URL_API = environment.url_api

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private http: HttpClient,
    private token: TokenService) { }

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    const token = this.token.retornaToken()
    const headers = new HttpHeaders().append('x-access-token', token)
    return this.http.get<Animais>(`${URL_API}/${nomeUsuario}/photos`, {
      headers
    })
  }
}

// Este é um serviço que consulta informações

// HttpHeader é uma classe acessória do 
// Angular para criar os objetos do tipo header.