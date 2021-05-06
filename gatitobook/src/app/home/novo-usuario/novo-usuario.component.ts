import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { minusculoValidator } from './validators/minusculo.validator';
import { NovoUsuario } from './novo-usuario';

import { NovoUsuarioService } from './novo-usuario.service';
import { UsuarioExisteService } from './usuario-existe.service';
import { usuarioSenhaIguaisValidator } from './validators/usuario-senha-iguais.validator';

@Component({
  selector: 'app-novo-usuario',
  templateUrl: './novo-usuario.component.html',
  styleUrls: ['./novo-usuario.component.css']
})
export class NovoUsuarioComponent implements OnInit {

  novoUsuarioForm!: FormGroup
  registroButton?: boolean

  constructor(
    private formBuilder: FormBuilder,
    private usuarioExistente: UsuarioExisteService,
    private novoUsuarioService: NovoUsuarioService,
    private router: Router) { }

  async ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.novoUsuarioForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required, Validators.minLength(4)]],
      userName: ['', [minusculoValidator], [this.usuarioExistente.usuarioJaExiste()]],
      password: ['']
    },
      {
        validators: [usuarioSenhaIguaisValidator]
      })
  }


  cadastrar() {
    if (this.novoUsuarioForm.valid) {
      const novoUsuario = this.novoUsuarioForm.getRawValue() as NovoUsuario
      this.novoUsuarioService.cadastraNovoUsuario(novoUsuario).subscribe(() => {
        this.router.navigate([''])
      },
        (err) => console.log(err))
    }

  }

}
