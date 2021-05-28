import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Animais } from '../animais';

@Component({
  selector: 'app-lista-animais',
  templateUrl: './lista-animais.component.html',
  styleUrls: ['./lista-animais.component.css']
})
export class ListaAnimaisComponent implements OnInit {

  animais!: Animais
  // animais$: Observable<Animais>

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(() => {
      this.animais = this.activatedRoute.snapshot.data['animais']
    })

  }
}


/**
 * Ao declarar "?? ''", atribui '' se for undefined ou nulo
 *
 * O switchMap é utilizado para mudar fluxo. Até então o fluxo de dados vinha
 * de usuárioService. Para retornar os animais, precisamos de dados baseados
 * no usuarioService. Para isso é necessário retorná-lo no parâmetro definido
 * como usuario.
 *
 * A variável animais$: Observable<Animais> fazia a atribuição para listagem
 * dos animais no component. Também usava o AnimaisService e UsuarioService
 * no constructor, mas quem fará o uso dela será o resolver. No cenário atual
 * a variável animais jpa receberá o dado tratado pelo nosso resolver.
 *
 *
 *
    //   Primeiro exemplo sem usar observable no ngOnInit()
    //   this.usuarioService.retornaUsuario().subscribe((usuario) => {
    //   const userName = usuario.name ?? ''
    //   this.animaisService.listaDoUsuario(userName).subscribe((animais) => {
    //   this.animais = animais
    //   })
    // })
 *
 */