import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais, Animal } from './animais';

const URL_API = environment.url_api

@Injectable({
  providedIn: 'root'
})
export class AnimaisService {

  constructor(
    private http: HttpClient,
    private token: TokenService) { }

  listaDoUsuario(nomeUsuario: string): Observable<Animais> {
    // const token = this.token.retornaToken()
    // const headers = new HttpHeaders().append('x-access-token', token)
    // return this.http.get<Animais>(`${URL_API}/${nomeUsuario}/photos`, {
    //   headers
    // })
    return this.http.get<Animais>(`${URL_API}/${nomeUsuario}/photos`)
  }

  buscaPorId(id: number): Observable<Animal> {
    return this.http.get<Animal>(`${URL_API}/photos/${id}`)
  }

}

/*
  Este é um serviço que consulta as informações no token de acesso.

  HttpHeader é uma classe acessória do Angular para criar os objetos
  do tipo header.

  Em listaDoUsuario() há um trecho de código comentado que indica a maneira
  antiga de declarar o token e o header na função. Ela não será necessária
  pois o Interceptor de Autenticacao já faz isso de forma transparente
  declarado no médulo da aplicação.

*/
