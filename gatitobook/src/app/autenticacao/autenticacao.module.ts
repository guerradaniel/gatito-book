import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AutenticacaoInterceptor } from './autenticacao.interceptor';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutenticacaoInterceptor,
      multi: true // indica uma cadeia de interceptors
    }
  ]
})
export class AutenticacaoModule { }


/*
  Por padrão o angular entende que teremos apenas uma classe de Interceptor.
  Se eu usar um outro interceptor e a propriedade 'multi' não for declarada,
  ele não será registrado.


*/