import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {HomeModule} from './pages/home/home.module'
import { CadastroProprietarioModule } from './pages/cadastro-proprietario/cadastro-proprietario.module';
import { CadastroCorretorModule } from './pages/cadastro-corretor/cadastro-corretor.module';
import {CadastroImovelModule} from './pages/cadastro-imovel/cadastro-imovel.module';
import { CadastroInquilinoModule } from './pages/cadastro-inquilino/cadastro-inquilino.module'

import {SharedModule} from './shared/shared-module.module';

import { MenuComponent } from './shared/menu/menu.component';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeModule,
    CadastroProprietarioModule,
    SharedModule,
    ReactiveFormsModule,
    CadastroCorretorModule,
    CadastroImovelModule,
    CadastroInquilinoModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
