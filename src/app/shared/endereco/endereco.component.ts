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

  // endereco: CepData = {
  //   cep: '',
  //   numero: '',
  //   complemento: '',
  //   bairro: '',
  //   uf: '',
  //   logradouro: '',
  //   localidade: ''
  // };

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

  // método criado antes de fazer o formGroup
  // buscarEndereco(): void {
  //   if (this.endereco.cep) {
  //     this.service.buscarCEP(this.endereco.cep).subscribe({
  //       next: (data) => {
  //         this.endereco = {
  //           cep: this.endereco.cep,
  //           bairro: data.bairro,
  //           uf: data.uf,
  //           logradouro: data.logradouro, // rua
  //           localidade: data.localidade, // cidade
  //           numero: data.numero,
  //           complemento: data.complemento,
  //         };
  //       },
  //       error: (error) => {
  //         console.error('Erro ao buscar o CEP:', error);
  //         alert('Erro ao buscar o CEP!');
  //       },
  //       complete: () => {
  //         console.log('Busca de CEP concluída.');
  //       }
  //     });
  //   }
  // }
}
