import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import {SharedModuleModule} from '../../shared/shared-module.module'

import {DadosBancariosComponent} from './dados-bancarios/dados-bancarios.component';
import { CadastroProprietarioComponent } from './cadastro-proprietario.component'


@NgModule({
  declarations: [
    DadosBancariosComponent,
    CadastroProprietarioComponent,

  ],
  exports:[
    //DadosBancariosComponent,
    CadastroProprietarioComponent

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModuleModule
  ]
})
export class CadastroProprietarioModule { }
