import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';

import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-novo-animal',
  templateUrl: './novo-animal.component.html',
  styleUrls: ['./novo-animal.component.css']
})
export class NovoAnimalComponent implements OnInit {

  formularioAnimal!: FormGroup
  file!: File //arquivo que vamos subir da foto
  preview!: string // url do preview da foto
  percentualConcluido = 0


  constructor(
    private animaisService: AnimaisService,
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.createForm()
  }

  createForm() {
    this.formularioAnimal = this.formBuilder.group({
      file: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      allowComments: [true]
    })
  }

  upload() {
    const allowComments = this.formularioAnimal.get('allowComments')?.value ?? false
    const description = this.formularioAnimal.get('description')?.value ?? ''

    this.animaisService.upload(description, allowComments, this.file)
      .pipe(
        finalize(() => this.router.navigate(['animais']))
      ).subscribe((evento: HttpEvent<any>) => {
        if (evento.type === HttpEventType.UploadProgress) {
          const total = evento.total ?? 1
          this.percentualConcluido = Math.round(100 * (evento.loaded / total))
        }
      }, (error) => console.log('error: ', error))
  }

  gravaArquivo(arquivo: any): void {
    const [file] = arquivo?.files  // pega o primeiro elemento. 
    this.file = file
    const reader = new FileReader()// le o arquivo para fazer o preview
    reader.onload = (event: any) => (this.preview = event.target.result)
    reader.readAsDataURL(file) // sobe e faz o preview da foto

  }

}

/**
 *
 * O gravaArquivo pega o arquivo e o carrega para fazer o preview.
 * Na primeira linha temos o código:
 *  const file = arquivo?.files[0]
*    // O input tipo file não retorna um array, pois como ele possibilita
*    // retornar múltiplos arquivos, ele retora 1 array de files.
 *
 * O método upload subirá a foto para a API. Ele recebe como parâmetro a
 * descrição, o allowComments e o arquivo tipo file que foi gravada usando
 * a instancia FileReader. Usamos um pipe pois o Observable não me trará o
 * objeto concluído . A cada passo da requisiçaõ ele devolverá a requisição.
 * Porante precisarei ler esse observable. Usamos o finalize que dirá "quando
 * finalizar a requisição, o que acontecerá?". Neste caso irá para a tela de
 * animais com a foto já inclusa.
 *
 * Ainda neste método foi definido que queremos observar cada um os passos
 * da requisição. O subscribe executará o tempo todo enquanto a foto sobe.
 * Ele recebe o evento como parâmetro do tipo HttpEvent. Há uma condição para
 * que se o evento (event.type) ainda estiver fazendo upload (HttpEventType
 * .UploadProgress) calculará o percentual.
 *
 */