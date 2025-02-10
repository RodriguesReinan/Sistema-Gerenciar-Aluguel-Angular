import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';  // Import necessário para ngModel

import {DadosPessoaisComponent} from '../shared/dados-pessoais/dados-pessoais.component';
import {EnderecoComponent} from '../shared/endereco/endereco.component'


@NgModule({
  declarations: [
    DadosPessoaisComponent,
    EnderecoComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  exports:[
    DadosPessoaisComponent,
    EnderecoComponent

  ],
})
export class SharedModuleModule { }
