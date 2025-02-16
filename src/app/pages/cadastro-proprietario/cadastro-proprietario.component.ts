import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Form} from '@angular/forms'

@Component({
  selector: 'app-cadastro-proprietario',
  templateUrl: './cadastro-proprietario.component.html',
  styleUrls: ['./cadastro-proprietario.component.css']
})
export class CadastroProprietarioComponent implements OnInit {
  cadastroForm!: FormGroup;
  endereco1: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      dadosPessoais: this.fb.group({}),
      dadosBancarios: this.fb.group({}),
      // endereco: this.fb.group({})
    })
  }

  salvar(){
    const dadosPessoais = this.cadastroForm.get('dadosPessoais')?.value;
    const dadosBancarios = this.cadastroForm.get('dadosBancarios')?.value;
    // const endereco = this.cadastroForm.get('endereco')?.value;

    console.log('Dados Pessoais:', dadosPessoais);
    console.log('Dados Bancários:', dadosBancarios);
    // console.log('Endereço:', endereco);

    // Aqui você chamaria os serviços que salvam cada dado em tabelas diferentes
    // this.apiService.salvarDadosPessoais(dadosPessoais).subscribe();
    // this.apiService.salvarDadosBancarios(dadosBancarios).subscribe();
    // this.apiService.salvarEndereco(endereco).subscribe();
  }

  get dadosPessoaisForm(): FormGroup {
    return this.cadastroForm.get('dadosPessoais') as FormGroup;
  }

  get dadosBancariosForm(): FormGroup {
    return this.cadastroForm.get('dadosBancarios') as FormGroup;
  }

  enderecoForm(dados: any) {
    this.endereco1 = dados;
    console.log('Endereço atualizado:', this.endereco1);
  }

}
