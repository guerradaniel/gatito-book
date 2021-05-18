import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Animal } from '../animais';
import { AnimaisService } from '../animais.service';

@Component({
  selector: 'app-detalhe-animal',
  templateUrl: './detalhe-animal.component.html',
  styleUrls: ['./detalhe-animal.component.css']
})
export class DetalheAnimalComponent implements OnInit {

  animalId!: number
  animal$!: Observable<Animal>


  constructor(
    private animaisService: AnimaisService,
    private activatedRoute: ActivatedRoute //
  ) { }

  ngOnInit(): void {
    this.animalId = this.activatedRoute.snapshot.params.animalId
    this.animal$ = this.animaisService.buscaPorId(this.animalId)
  }

}

/*
  O component será dinâmico a partir da rora utilizada. Para pegar o Id do
  animal e passar para o servico usamos o service padrão ActivatedRoute.

  O Typescript não dá autocomplete pelo fato de o que foi definido na rota
  é uma string.

*/