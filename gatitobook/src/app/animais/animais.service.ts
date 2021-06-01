import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, mapTo } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { TokenService } from '../autenticacao/token.service';
import { Animais, Animal } from './animais';

const URL_API = environment.url_api
const NOT_MODIFIED = '304'


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

  excluiAnimal(id: number): Observable<Animal> {
    return this.http.delete<Animal>(`${URL_API}/photos/${id}`)
  }

  curtirAnimal(id: number): Observable<boolean> {
    return this.http.post(`${URL_API}/photos/${id}/like`,   //rota
      {}, //body 
      { observe: 'response' } //passa response inteira e usado para ver o status
    ).pipe(
      mapTo(true), // sempre emitirá o valor passado por parâmetro
      catchError((erro) => { // só executa essa função se apresentar erro
        return erro.status == NOT_MODIFIED ? of(false) : throwError(erro) // tratamento do erro
      })
    )
  }

  upload(descricao: string, permiteComentario: boolean, arquivo: File) { // retorna Observable
    const formData = new FormData()
    // Empacota em um Objeto JS com arquivos binários. 
    formData.append('description', descricao)
    formData.append('allowComments', permiteComentario ? 'true' : 'false')
    formData.append('imageFile', arquivo)

    // Monitorar o progresso da requisição (objeto)
    return this.http.post(`${URL_API}/photos/upload`, formData, {
      observe: 'events',
      reportProgress: true //  
    })

  }

}

/*
  Este é um serviço que consulta as informações no token de acesso.

  HttpHeader é uma classe acessória do Angular para criar os objetos
  do tipo header.

  Em listaDoUsuario() há um trecho de código comentado que indica a maneira
  antiga de declarar o token e o header na função. Ela não será necessária
  pois o Interceptor de Autenticacao já faz isso de forma transparente
  declarado no módulo da aplicação.

  No método curtir, junto ao back-end preciso tratar as requests 200 ou 304
  (caso já tenha sido curtido). Para isso é necessário retornar um boolean
  (true ou false). O HttpClient passa por padrão apenas o body da request no
  método post e neste caso queremos o status da request (3o param). O mapTo
  retorna true como parâmetro quando o valor emitido na response for success
  e o catchError só executará quando der um erro.

  No método upload, para que eu consiga subir as imagens é necessário
  empacotar o arquivo em um objeto js chamado FormData. Os primeiros parâmetros
  do post desse objeto são os que o back-end está esperando. Como estamos em um
  Observable, o Angular fará um next mandando em que etapa está a requisição.
  Em nosso componente podemos obersavar isso com subscribe e mostrar isso para
  o usuário.


*/
