import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { InquilinoService } from '../../services/inquilino.service';
import { cpfCnpjValidator } from '../../validador/cpf-cnpj.validador';

@Component({
  selector: 'app-cadastro-inquilino',
  templateUrl: './cadastro-inquilino.component.html',
  styleUrls: ['./cadastro-inquilino.component.css']
})
export class CadastroInquilinoComponent implements OnInit {
  cadastroForm!: FormGroup;
  inquilinos: any[] = [];

  constructor(private fb: FormBuilder, private inquilinoService: InquilinoService) { }

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
        email: [''],
        dt_nascimento: [''],
        nome_pai: [''],
        nome_mae: ['']
      }),
    })
  }


  carregarInquilinos(){
    this.inquilinoService.getInquilinos().subscribe(
      (data) => {
        this.inquilinos = data;
      },
      (error) => {
        console.error('Erro ao carregar os proprietários', error);
      }
    );
  }

  salvar(){
    if (this.cadastroForm.invalid) {
      window.alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // os nomes dos atributos de novoInquilino, tem que ser igual ao nome na api
    const dadosPessoais = this.cadastroForm.get('dadosPessoais')?.value;

    // Ensure no empty strings are sent
    for (const key in dadosPessoais) {
      if (typeof dadosPessoais[key] === 'string' && !dadosPessoais[key].trim()) {
          window.alert(`O campo ${key} não pode estar vazio.`);
          return;
      }
    }

    const novoInquilino = {
      nome: dadosPessoais.nome,
      cpf: dadosPessoais.cpf_cnpj,
      telefone: dadosPessoais.telefone,
      rg: dadosPessoais.rg,
      orgao_emissor: dadosPessoais.orgao_emissor,
      estado_civil: dadosPessoais.estado_civil,
      profissao_ocupacao: dadosPessoais.profissao_ocupacao,
      email: dadosPessoais.email,
      data_nascimento: dadosPessoais.dt_nascimento,
      nome_pai: dadosPessoais.nome_pai,
      nome_mae: dadosPessoais.nome_mae
    }

    this.inquilinoService.createInquilino(novoInquilino).subscribe({
      next: (response) => {
        console.log('Inquilino salvo com sucesso!', response);
        this.carregarInquilinos();  // Atualiza a lista

        this.cadastroForm.reset();

        // Exibe mensagem de sucesso
        window.alert('Cadastro realizado com sucesso!');
      },
      error: (error) => {
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

        window.alert(mensagemErro);
      },
      complete: () => {}
    });

  }

  get dadosPessoaisForm(): FormGroup {
    return this.cadastroForm.get('dadosPessoais') as FormGroup;
  }

}
