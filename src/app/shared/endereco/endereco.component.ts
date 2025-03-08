import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CepData } from 'src/app/models/cepData';
import { CepService } from 'src/app/services/cep.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {

  enderecoForm!: FormGroup; // Evita erro de inicialização antes do `ngOnInit`
  @Output() enderecoChange = new EventEmitter<any>();

  constructor(
    private service: CepService,
    private fb:FormBuilder,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.enderecoForm = this.fb.group({
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: ''
    });

  }

  buscarCep() {
    const cep = this.enderecoForm.get('cep')?.value;
    if (cep && cep.length === 8) {
      this.service.buscarCEP(cep).subscribe(dados => {
        if (dados) {

          this.enderecoForm.patchValue({
            logradouro: dados.logradouro,
            bairro: dados.bairro,
            localidade: dados.localidade,
            uf: dados.uf,
          });

          this.cdRef.detectChanges();
          // this.enderecoChange.emit(this.enderecoForm.value);
        }
      });
    }
  }

  // O usuário confirma o endereço após preencher o número e complemento
  confirmarEndereco() {
    // console.log("Endereço confirmado:", this.enderecoForm.value);
    this.enderecoChange.emit(this.enderecoForm.value);
  }

}
