import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

const URL_API = 'http://localhost:3000'

@Injectable({
  providedIn: 'root'
})
export class AutenticacaoService {

  constructor(private http: HttpClient) { }

  autenticar(usuario: string, senha: string): Observable<any> {
    return this.http.post(`${URL_API}/user/login`, {
      userName: usuario,
      password: senha
    })
  }
}
