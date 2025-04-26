import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';  // Import necessário para ngModel

import { DadosPessoaisComponent } from './dados-pessoais/dados-pessoais.component';
import { EnderecoComponent } from './endereco/endereco.component';
import { DadosBancarioComponent } from './dados-bancario/dados-bancario.component';
import { SharedConsultaPessoasComponent } from './shared-consulta-pessoas/shared-consulta-pessoas.component';
import { NotificacoesComponent } from './notificacoes/notificacoes.component'


@NgModule({
  declarations: [
    DadosPessoaisComponent,
    EnderecoComponent,
    DadosBancarioComponent,
    SharedConsultaPessoasComponent,
    NotificacoesComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports:[
    DadosPessoaisComponent,
    EnderecoComponent,
    DadosBancarioComponent,
    SharedConsultaPessoasComponent,
    NotificacoesComponent
  ],
})
export class SharedModule { }
