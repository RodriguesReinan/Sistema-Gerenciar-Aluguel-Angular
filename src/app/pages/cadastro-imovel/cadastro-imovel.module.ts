import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';  // Import necessário para ngModel

import {InfoImovelComponent} from './info-imovel/info-imovel.component'
import { CadastroImovelComponent } from './cadastro-imovel.component';
import { SharedModule } from "../../shared/shared-module.module";

@NgModule({
  declarations: [
    InfoImovelComponent,
    CadastroImovelComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
],
  exports:[
    CadastroImovelComponent
  ]
})
export class CadastroImovelModule { }
