import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

const URL_API = environment.url_api

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
