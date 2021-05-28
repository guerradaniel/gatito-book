import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comentario, Comentarios } from './comentarios';

const URL_API = environment.url_api

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(
    private http: HttpClient) { }

  buscaComentario(id: number): Observable<Comentarios> {
    return this.http.get<Comentarios>(`${URL_API}/photos/${id}/comments`)
  }

  incluiComentario(id: number, commentText: string): Observable<Comentario> {
    return this.http.post<Comentario>(`${URL_API}/photos/${id}/comments`, { commentText })
  }

}