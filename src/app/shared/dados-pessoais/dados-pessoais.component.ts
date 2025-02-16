import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-dados-pessoais',
  templateUrl: './dados-pessoais.component.html',
  styleUrls: ['./dados-pessoais.component.css']
})
export class DadosPessoaisComponent implements OnInit {
  @Input() formGroupParent!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.formGroupParent.addControl('nome', new FormControl(''));
    this.formGroupParent.addControl('telefone', new FormControl(''));
  }

}
