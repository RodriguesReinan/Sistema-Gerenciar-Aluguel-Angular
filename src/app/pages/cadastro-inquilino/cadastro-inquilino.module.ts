import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';  // Import necessário para ngModel

import {SharedModule} from '../../shared/shared-module.module';

import { CadastroInquilinoComponent } from './cadastro-inquilino.component'

@NgModule({
  declarations: [CadastroInquilinoComponent],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CadastroInquilinoModule { }
