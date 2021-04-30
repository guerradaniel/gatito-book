import { Component, OnInit } from '@angular/core';
import { AutenticacaoService } from 'src/app/autenticacao/autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario = ''
  senha = ''

  constructor(private auth: AutenticacaoService) { }

  ngOnInit(): void {
  }

  login() {
    this.auth.autenticar(this.usuario, this.senha).subscribe(() => {
      console.log('Autenticado')
    },
      (error) => {
        alert('Usuário ou senha inválido')
        console.log(error)
      }
    )
  }

}
