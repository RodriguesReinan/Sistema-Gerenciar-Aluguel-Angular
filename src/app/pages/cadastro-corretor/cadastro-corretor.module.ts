import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';  // Import necessário para ngModel

import { SharedModule } from '../../shared/shared-module.module';

import { CadastroCorretorComponent } from './cadastro-corretor.component';


@NgModule({
  declarations: [
    CadastroCorretorComponent,
  ],

  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  exports: [
    CadastroCorretorComponent
  ],
})
export class CadastroCorretorModule { }
