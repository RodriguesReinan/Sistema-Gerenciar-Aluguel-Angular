import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';  // Import necessário para ngModel

import {SharedModule} from '../../shared/shared-module.module'

import {DadosBancariosComponent} from './dados-bancarios/dados-bancarios.component';
import { CadastroProprietarioComponent } from './cadastro-proprietario.component';


@NgModule({
  declarations: [
    DadosBancariosComponent,
    CadastroProprietarioComponent,

  ],
  exports:[
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class CadastroProprietarioModule { }
