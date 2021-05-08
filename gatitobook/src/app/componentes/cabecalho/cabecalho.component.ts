import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/autenticacao/usuario/usuario.service';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent {

  user$ = this.usuario.retornaUsuario()

  constructor(
    private usuario: UsuarioService,
    private router: Router
  ) { }

  logout() {
    this.usuario.logout()
    this.router.navigate([''])
  }


}
