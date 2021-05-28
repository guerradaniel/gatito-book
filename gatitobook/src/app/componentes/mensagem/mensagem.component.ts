import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-mensagem',
  templateUrl: './mensagem.component.html',
  styleUrls: ['./mensagem.component.css']
})
export class MensagemComponent implements OnInit {

  @Input() mensagem = ''
  form?: FormGroup


  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
  }

  createForm() {

  }

}
