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
 * Na primeira linha temos o c??digo:
 *  const file = arquivo?.files[0]
*    // O input tipo file n??o retorna um array, pois como ele possibilita
*    // retornar m??ltiplos arquivos, ele retora 1 array de files.
 *
 * O m??todo upload subir?? a foto para a API. Ele recebe como par??metro a
 * descri????o, o allowComments e o arquivo tipo file que foi gravada usando
 * a instancia FileReader. Usamos um pipe pois o Observable n??o me trar?? o
 * objeto conclu??do . A cada passo da requisi??a?? ele devolver?? a requisi????o.
 * Porante precisarei ler esse observable. Usamos o finalize que dir?? "quando
 * finalizar a requisi????o, o que acontecer???". Neste caso ir?? para a tela de
 * animais com a foto j?? inclusa.
 *
 * Ainda neste m??todo foi definido que queremos observar cada um os passos
 * da requisi????o. O subscribe executar?? o tempo todo enquanto a foto sobe.
 * Ele recebe o evento como par??metro do tipo HttpEvent. H?? uma condi????o para
 * que se o evento (event.type) ainda estiver fazendo upload (HttpEventType
 * .UploadProgress) calcular?? o percentual.
 *
 */