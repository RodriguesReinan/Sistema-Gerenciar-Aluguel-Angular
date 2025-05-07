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

    if (!cep){
      alert('Por favor, digite um CEP.');
      return;
    }

    const cepNumerico = cep.replace(/\D/g, '');

    if (cepNumerico.length !== 8) {
      alert('CEP inválido. Digite um CEP com 8 dígitos, com ou sem hífen.');
      return;
    }

    this.service.buscarCEP(cep).subscribe({
      next: (dados) => {
        if (dados.erro) {
          alert('CEP não encontrado. Verifique se digitou corretamente.');
          return;
        }

        this.enderecoForm.patchValue({
          logradouro: dados.logradouro,
          bairro: dados.bairro,
          localidade: dados.localidade,
          uf: dados.uf,
        });

        this.cdRef.detectChanges();
      },
      error: (err) => {
        console.error('Erro ao buscar CEP:', err);
        alert('Erro ao consultar o CEP. Tente novamente mais tarde.');
      }
    });
  }

  // O usuário confirma o endereço após preencher o número e complemento
  confirmarEndereco() {
    // console.log("Endereço confirmado:", this.enderecoForm.value);
    // this.enderecoChange.emit(this.enderecoForm.value);

    if (this.enderecoForm.valid) {
      this.enderecoChange.emit(this.enderecoForm.value);
      this.enderecoForm.get('cep')?.setValue('');  // Limpa o CEP
      this.enderecoForm.get('logradouro')?.setValue('');  // Limpa o CEP
      this.enderecoForm.get('numero')?.setValue('');  // Limpa o CEP
      this.enderecoForm.get('complemento')?.setValue('');  // Limpa o CEP
      this.enderecoForm.get('bairro')?.setValue('');  // Limpa o CEP
      this.enderecoForm.get('localidade')?.setValue('');  // Limpa o CEP
      this.enderecoForm.get('uf')?.setValue('');  // Limpa o CEP
      alert('Endereço confirmado!');
    } else {
      alert('Por favor, preencha o endereço corretamente.');
    }
  }

}
