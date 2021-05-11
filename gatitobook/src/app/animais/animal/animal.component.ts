import { Component, Input, OnInit } from '@angular/core';

const URL_API = 'http://localhost:3000'

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {

  private urlOriginal = ''

  @Input() descricao = ''

  @Input() set url(url: string) { // atribui um valor

    if (url.startsWith('data')) this.urlOriginal = url
    else this.urlOriginal = `${URL_API}/imgs/${url}`

  }

  get url(): string { // retorna um valor
    return this.urlOriginal
  }

  constructor() { }

  ngOnInit(): void {
  }

}
