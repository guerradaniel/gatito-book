import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  animais$!: Observable<Animais>

  constructor(
    private usuarioService: UsuarioService, // pega infos de users logados
    private animaisService: AnimaisService // atribui animais para grade
  ) { }

  ngOnInit(): void {
    // this.usuarioService.retornaUsuario().subscribe((usuario) => {
    //   const userName = usuario.name ?? ''
    //   this.animaisService.listaDoUsuario(userName).subscribe((animais) => {
    //     this.animais = animais
    //   })
    // })

    this.animais$ = this.usuarioService.retornaUsuario().pipe(
      switchMap((usuario) => {
        const userName = usuario.name ?? ''
        return this.animaisService.listaDoUsuario(userName)
      })
    )
  }

}


// em "?? ''", atribui '' se for undefined ou nulo
