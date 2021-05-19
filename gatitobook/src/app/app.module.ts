import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { CabecalhoModule } from './componentes/cabecalho/cabecalho.module';
import { RodapeModule } from './componentes/rodape/rodape.module';
import { AutenticacaoInterceptor } from './autenticacao/autenticacao.interceptor';
import { AutenticacaoModule } from './autenticacao/autenticacao.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CabecalhoModule,
    RodapeModule,
    AutenticacaoModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
