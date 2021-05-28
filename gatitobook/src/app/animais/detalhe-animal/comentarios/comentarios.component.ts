import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Comentarios } from './comentarios';
import { ComentariosService } from './comentarios.service';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.component.html',
  styleUrls: ['./comentarios.component.css']
})
export class ComentariosComponent implements OnInit {

  @Input() id!: number
  comentarios$!: Observable<Comentarios>
  comentarioForm!: FormGroup;

  constructor(
    private form: FormBuilder,
    private service: ComentariosService
  ) { }

  ngOnInit(): void {
    this.comentarios$ = this.service.buscaComentario(this.id)

    this.comentarioForm = this.form.group({
      comentario: ['', Validators.maxLength(300)]
    })
  }


  gravar(): void {
    const comentario = this.comentarioForm.get('comentario')?.value ?? ''

    this.comentarios$ = this.service.incluiComentario(this.id, comentario)
      .pipe(
        switchMap(() =>
          this.service.buscaComentario(this.id)),
        tap(() => {
          this.comentarioForm.reset()
          alert('Comentário salvo!!!')
        })
      )
  }

}

/**
 *  No momento em que o usuário comentar, a página precisa ser recarregada.
 *  Assim, o comentário precisa pegar a nova informação que acabamos de
 *  incluir. O switchMap foi usado para converter o fluxo de inclusão para
 *  um fluxo de busca do servidor.
 *
 *  Usei o tap para resetar o formulário. o tap é usado para coisas que não
 *  vão afetar o fluxo acima mas precisa acontecer durante o processamento.
 *
 *
 *
 *
 * Criar função para bloquear o usuário de escrever comentário vazio
 */
