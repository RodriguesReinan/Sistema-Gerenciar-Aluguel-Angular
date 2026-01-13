import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-info-imovel',
  templateUrl: './info-imovel.component.html',
  styleUrls: ['./info-imovel.component.css']
})
export class InfoImovelComponent implements OnInit {
  @Input() formGroupParent!: FormGroup;
  @Input() proprietarios: any[] = []; // Recebe os proprietários do componente pai
  @Input() opcoesCasaApartamento: any[] = [];

  constructor() { }

  ngOnInit(): void {
    this.formGroupParent.addControl('tipo_imovel', new FormControl(''));
    this.formGroupParent.addControl('casa_apartamento', new FormControl(''));
    this.formGroupParent.addControl('aluguel_venda', new FormControl(''));
    this.formGroupParent.addControl('area_total', new FormControl(''));
    this.formGroupParent.addControl('quartos', new FormControl(''));
    this.formGroupParent.addControl('suites', new FormControl(''));
    this.formGroupParent.addControl('banheiros', new FormControl(''));
    this.formGroupParent.addControl('descricao', new FormControl(''));

  }

}
