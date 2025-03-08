import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'


@Component({
  selector: 'app-cadastro-corretor',
  templateUrl: './cadastro-corretor.component.html',
  styleUrls: ['./cadastro-corretor.component.css']
})
export class CadastroCorretorComponent implements OnInit {
  cadastroForm!: FormGroup;
  endereco: any = {};

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      dadosPessoais: this.fb.group({}),
      dadosBancarios: this.fb.group({}),
    })
  }

  salvar(){
    const dadosPessoais = this.cadastroForm.get('dadosPessoais')?.value;
    const dadosBancarios = this.cadastroForm.get('dadosBancarios')?.value;

    console.log('Dados Pessoais:', dadosPessoais);
    console.log('Dados Bancários:', dadosBancarios);

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
    this.endereco = dados;
    console.log('Endereço atualizado:', this.endereco);
  }
}
