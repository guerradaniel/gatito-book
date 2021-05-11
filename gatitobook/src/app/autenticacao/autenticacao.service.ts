import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http'
import { Observable } from 'rxjs';

import { UsuarioService } from './usuario/usuario.service';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const URL_API = environment.url_api

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private http: HttpClient,
    private usuarioService: UsuarioService) { }

  autenticar(usuario: string, senha: string): Observable<HttpResponse<any>> {
    return this.http.post(`${URL_API}/user/login`, {
      userName: usuario,
      password: senha
    },
      { observe: 'response' } // Traz o header da requisição
    ).pipe(
      tap((res) => {
        const authToken = res.headers.get('x-access-token') ?? ''
        this.usuarioService.salvaToken(authToken)
      })
    )
  }
}
