import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dados-bancarios',
  templateUrl: './dados-bancarios.component.html',
  styleUrls: ['./dados-bancarios.component.css']
})
export class DadosBancariosComponent implements OnInit {
  @Input() formGroupParent!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formGroupParent.addControl('banco', new FormControl(''));
    this.formGroupParent.addControl('agencia', new FormControl(''));
    this.formGroupParent.addControl('numero_conta', new FormControl(''));
    this.formGroupParent.addControl('chave_pix', new FormControl(''));
    this.formGroupParent.addControl('tipo_chave_pix', new FormControl(''));
  }

}
