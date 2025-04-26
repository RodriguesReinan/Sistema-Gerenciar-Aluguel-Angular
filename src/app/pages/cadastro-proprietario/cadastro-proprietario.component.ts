import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import { ProprietarioService } from '../../services/proprietario.service';
// Se você estiver usando a variável em algum binding e ela precisar ser atualizada,
// você pode usar o método markForCheck para forçar a detecção de mudanças:
import { ChangeDetectorRef } from '@angular/core';
import { cpfCnpjValidator } from '../../validador/cpf-cnpj.validador';

@Component({
  selector: 'app-cadastro-proprietario',
  templateUrl: './cadastro-proprietario.component.html',
  styleUrls: ['./cadastro-proprietario.component.css']
})
export class CadastroProprietarioComponent implements OnInit {
  cadastroForm!: FormGroup;
  endereco1: any = {};
  proprietarios: any[] = [];

  constructor(private fb: FormBuilder, private proprietarioService: ProprietarioService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      dadosPessoais: this.fb.group({
        nome: [''],
        cpf_cnpj: ['', [cpfCnpjValidator]],
        telefone: [''],

        rg: [''],
        orgao_emissor: [''],
        estado_civil: [''],
        profissao_ocupacao: [''],
        email: ['']
      }),
      dadosBancarios: this.fb.group({}),
    })
  }

  carregarProprietarios(){
    this.proprietarioService.getProprietarios().subscribe(
      (data) => {
        this.proprietarios = data;
        console.log('Proprietários carregados', data);
      },
      (error) => {
        console.error('Erro ao carregar os proprietários', error);
      }
      );
  }

  salvar(){
    const dadosPessoais = this.cadastroForm.get('dadosPessoais')?.value;
    const dadosBancarios = this.cadastroForm.get('dadosBancarios')?.value;

    // O endereço pode ser atualizado de um componente separado
    const endereco = this.endereco1;

    // Criar um único objeto combinando os dados dos diferentes componentes
    const novoProprietario = {
      nome: dadosPessoais.nome,
      cpf: dadosPessoais.cpf_cnpj,
      telefone: dadosPessoais.telefone,
      rg: dadosPessoais.rg,
      orgao_emissor: dadosPessoais.orgao_emissor,
      estado_civil: dadosPessoais.estado_civil,
      profissao_ocupacao: dadosPessoais.profissao_ocupacao,
      email: dadosPessoais.email,
      endereco: `${endereco.cep}, ${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}`,
      conta_bancaria: dadosBancarios.numero_conta,
      pix: dadosBancarios.chave_pix,
      chave_pix: dadosBancarios.tipo_chave_pix,
    };

    console.log('Objeto enviado para API:', novoProprietario);

    this.proprietarioService.createProprietario(novoProprietario).subscribe(
      (response) => {
        console.log('Proprietário salvo com sucesso!', response);
        this.carregarProprietarios();  // Atualiza a lista

        // ✅ Limpa todos os campos do formulário
        this.cadastroForm.reset();
        // ✅ Limpa o endereço
        this.endereco1 = {};
        this.cdRef.markForCheck();  // Força a detecção de mudanças

        // Exibe mensagem de sucesso
        window.alert('Cadastro realizado com sucesso!');
      },
      (error) => {
        console.log('Erro ao salvar o proprietário: ', error)
        // Exibe mensagem de erro
        window.alert('Erro ao realizar o cadastro. Tente novamente.');
      }
    );
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
