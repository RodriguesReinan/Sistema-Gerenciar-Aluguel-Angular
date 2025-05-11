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
      dadosBancarios: this.fb.group({
        agencia: [''],            // 👈 sem Validators
        banco: [''],
        numero_conta: [''],
        chave_pix: [''],
        tipo_chave_pix: [''],
      }),
    })
  }

  carregarProprietarios(){
    this.proprietarioService.getProprietarios().subscribe(
      (data) => {
        this.proprietarios = data;
        // console.log('Proprietários carregados', data);
      },
      // (error) => {
      //   console.error('Erro ao carregar os proprietários', error);
      // }
      );
  }

  salvar(){
    // console.log(this.cadastroForm.status, this.cadastroForm.errors, this.cadastroForm);
    if (this.cadastroForm.invalid) {
      window.alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const dadosPessoais = this.cadastroForm.get('dadosPessoais')?.value;
    const dadosBancarios = this.cadastroForm.get('dadosBancarios')?.value;

    // O endereço pode ser atualizado de um componente separado
    const endereco = this.endereco1;

    // Ensure no empty strings are sent
    for (const key in dadosPessoais) {
      if (typeof dadosPessoais[key] === 'string' && !dadosPessoais[key].trim()) {
          window.alert(`O campo ${key} não pode estar vazio.`);
          return;
      }
    }

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

      conta_bancaria: `${dadosBancarios.numero_conta}, ${dadosBancarios.banco}, ${dadosBancarios.agencia}` || null,
      pix: dadosBancarios.chave_pix || null,
      chave_pix: dadosBancarios.tipo_chave_pix || null,
    };

    this.proprietarioService.createProprietario(novoProprietario).subscribe(
      (response) => {
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
        let mensagemErro = 'Erro ao realizar o cadastro. Tente novamente';

        if (error.status === 409) {
          // Conflito (e.g., duplicidade)
          mensagemErro = `Erro: ${error.error.detail}.`;
        } else if (error.status === 422) {
          // Erro de validação (Pydantic/FastAPI)
          if (Array.isArray(error.error.detail)) {
              // Extrai as mensagens de erro do array 'detail'
              mensagemErro = error.error.detail.map((err: any) => {
                  const field = err.loc[err.loc.length - 1]; // Pega o último item do 'loc' (nome do campo)
                  // Remove "Value error," prefix from the message
                  const cleanMsg = err.msg.replace(/^Value error, /, '');
                  return `Campo ${field}: ${cleanMsg}`;
              }).join('\n');
          } else {
              mensagemErro = `Erro: ${error.error.detail}`;
          }
        } else {
            // Outros erros (e.g., 500)
            mensagemErro = `Erro: ${error.error.detail || 'Erro inesperado.'}`;
        }

        // Exibe mensagem de erro
        window.alert(mensagemErro);
      }
    );
  }

  // editar_proprietario(pessoa: any){
  //   const update_proprietario = {
  //     nome: pessoa.nome,
  //     telefone: pessoa.telefone,
  //     endereco: pessoa.endereco,
  //     conta_bancaria: pessoa.conta_bancaria,
  //     pix: pessoa.pix,
  //     chave_pix: pessoa.chave_pix,
  //     estado_civil: pessoa.estado_civil,
  //     profissao_ocupacao: pessoa.profissao_ocupacao,
  //     email: pessoa.email
  //   };
  //   console.log('metodo editar_proprietario', update_proprietario);

  //   // this.proprietarioService.updateProprietario(id).subscribe({})
  // }

  get dadosPessoaisForm(): FormGroup {
    return this.cadastroForm.get('dadosPessoais') as FormGroup;
  }

  get dadosBancariosForm(): FormGroup {
    return this.cadastroForm.get('dadosBancarios') as FormGroup;
  }

  enderecoForm(dados: any) {
    this.endereco1 = dados;
  }

}
