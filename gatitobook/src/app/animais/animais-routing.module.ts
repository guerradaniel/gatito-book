import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimalComponent } from './animal/animal.component';
import { DetalheAnimalComponent } from './detalhe-animal/detalhe-animal.component';
import { ListaAnimaisComponent } from './lista-animais/lista-animais.component';
import { ListaAnimaisResolver } from './lista-animais/lista-animais.resolver';
import { NovoAnimalComponent } from './novo-animal/novo-animal.component';

const routes: Routes = [
  {
    path: '',
    component: ListaAnimaisComponent,
    resolve: {
      animais: ListaAnimaisResolver
    }
  },
  {
    path: 'novo',
    component: NovoAnimalComponent
  },
  {
    path: ':animalId', // rota variável que recebe um valor
    component: DetalheAnimalComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimaisRoutingModule { }


/**
 * No path ListaAnimaisResolver, o  resolver fará a busca no back,
 * traz o observable, retirar a informação que precisamos e coloca
 * na variável animais. Com isso, temos acesso a esses dados antes
 * do componente ser renderizado.
 *
 *
 *
 *
 */