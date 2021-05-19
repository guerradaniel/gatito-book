import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if (this.tokenService.possuiToken()) {
      const token = this.tokenService.retornaToken()
      const headers = new HttpHeaders().append('x-access-token', token)
      request = request.clone({ headers })
    }

    return next.handle(request);
  }
}

/*
  O interceptor tem o objetivo de interceptar toda a requisição http que sai
  do nosso front-end e manipulá-la antes de ir para o servidor.

  Neste contexto é utilizado para anexar o token e evitar a repetição de
  código toda vezes que vou usá-lo.

  O método intercept recebe uma requisição que é imutável. Para alterar o
  objeto eu preciso fazer um clone do mesmo e inserir a informação adicional.
  Em 'next.handle(resquest)', a requisição continua com o request alterado.

*/