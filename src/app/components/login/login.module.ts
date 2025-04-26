import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';  // Import necessário para ngModel
import { LoginComponent } from './login.component';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [LoginComponent] // Opcional, se o componente for usado fora deste módulo
})
export class LoginModule { }
