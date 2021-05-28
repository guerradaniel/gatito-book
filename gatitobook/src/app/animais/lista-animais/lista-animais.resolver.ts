import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';

import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';
import { Animais } from '../animais';
import { AnimaisService } from '../animais.service';

@Injectable({
  providedIn: 'root'
})
export class ListaAnimaisResolver implements Resolve<Animais> {

  constructor(
    private usuario: UsuarioService, // pega infos de users logados
    private animais: AnimaisService // atribui animais para grade
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Animais> {
    return this.usuario.retornaUsuario().pipe(
      switchMap((user) => { //converte o fluxo para AnimaisService
        const userName = user.name ?? ''
        return this.animais.listaDoUsuario(userName)
      }),
      take(1) // fará o switchmap e depois irá finalizar
    )
  }
}

/**
 * A guarda é utilizada para organizar o fluxo de navegação que também
 * se torna útil quando se trata de performance.
 *
 * O objetivo é realizar alguma operação antes da rota ser resolvida.
 * Na lista de animais, nós carregávamos a lista a partir do componente
 * já criado. Neste caso começamos a fazer a busca na API enquanto a
 * página é renderizada. Quando o usuário clica na rota ele já começa
 * a busca.
 *
 * Quando o resolver é usado temos que garantir que o Observable será
 * finalizado. O método listaDoUsuario() se auto-finaliza pois o mesmo é
 * uma requisição. O método retornaUsuario() utiliza o subject que
 * continua aberto. Se não o fecharmos manualmente aceitando apenas um
 * item do fluxo (take(1)), ele ainda ficará aberto.
 */