import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';  // Import necessário para ngModel

import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { DadosBancarioComponent } from './dados-bancario/dados-bancario.component';



@NgModule({
  declarations: [
    DadosPessoaisComponent,
    EnderecoComponent,
    DadosBancarioComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  exports:[
    DadosPessoaisComponent,
    EnderecoComponent,
    DadosBancarioComponent
  ],
})
export class SharedModule { }
