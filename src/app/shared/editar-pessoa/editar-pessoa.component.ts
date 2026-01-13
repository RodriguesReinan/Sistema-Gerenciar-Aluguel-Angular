import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ProprietarioService } from '../../services/proprietario.service';
import { InquilinoService } from '../../services/inquilino.service';

@Component({
  selector: 'app-editar-pessoa',
  templateUrl: './editar-pessoa.component.html',
  styleUrls: ['./editar-pessoa.component.css']
})
export class EditarPessoaComponent implements OnInit {
  formGroupParent!: FormGroup;
  tipoPessoa!: string;
  id_pessoa!: string

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder,
    private inquilinoService: InquilinoService,
    private proprietarioService: ProprietarioService
  ) { }

  ngOnInit(): void {
    this.formGroupParent = this.fb.group({
      nome: [''],
      cpf_cnpj: [''],
      rg: [''],
      orgao_emissor: [''],
      estado_civil: [''],
      profissao_ocupacao: [''],
      email: [''],
      telefone: [''],
      endereco: [''],
      conta_bancaria: [''],
      chave_pix: [''],
      pix: ['']
    });

    this.route.params.subscribe(parametros => {
      this.tipoPessoa = parametros['tipo'];
      const id = parametros['id'];
      if (id){
        this.carregarDados(id);
        // Se for modo de edição, desabilitar o campo CPF-CNPJ
        if(this.isEdicao()){
          this.formGroupParent.get('cpf_cnpj')?.disable();
        }
      }
    });
  }

  // Método para verificar se é modo de edição
  isEdicao(): boolean {
    return this.route.snapshot.url[0]?.path === 'editar-proprietario';
  }

  carregarDados(id: string): void{
    this.id_pessoa = id;
    if(this.tipoPessoa === 'proprietario'){

      this.proprietarioService.getProprietarioById(id).subscribe({
        next: (data) => {
          // Desabilitar o campo CPF-CNPJ diretamente no FormGroup
          this.formGroupParent.get('cpf_cnpj')?.setValue(data.cpf);
          this.formGroupParent.get('cpf_cnpj')?.disable();

          // Desabilitar o campo rg diretamente no FormGroup
          this.formGroupParent.get('rg')?.setValue(data.cpf);
          this.formGroupParent.get('rg')?.disable();

          // Desabilitar o campo orgao_emissor diretamente no FormGroup
          this.formGroupParent.get('orgao_emissor')?.setValue(data.cpf);
          this.formGroupParent.get('orgao_emissor')?.disable();

          // Mapeamento entre os campos da API e os campos do formulário
        const mapeamento: { [key: string]: string } = {
          cpf: 'cpf_cnpj',
          endereco: 'endereco',
          nome: 'nome',
          telefone: 'telefone',
          email: 'email',
          estado_civil: 'estado_civil',
          profissao_ocupacao: 'profissao_ocupacao',
          chave_pix: 'chave_pix',
          pix: 'pix',
          conta_bancaria: 'conta_bancaria',
          rg: 'rg',
          orgao_emissor: 'orgao_emissor',
        };

        // Criando o objeto com as chaves corrigidas
        const dadosCorrigidos: { [key: string]: any } = {};
        for (const [campoApi, campoForm] of Object.entries(mapeamento)) {
          if (data[campoApi] !== undefined) {
            dadosCorrigidos[campoForm] = data[campoApi];
          }
        }

        // Atualizando o formulário com os campos corrigidos
        this.formGroupParent.patchValue(dadosCorrigidos);
        },
        error: (err) => {
          console.error('Erro ao carregar dados:', err);
        }

      });
    }
    else if (this.tipoPessoa === 'inquilino'){
      this.inquilinoService.getInquilinoById(id).subscribe({
        next: (data) => {

          // Desabilitar o campo CPF-CNPJ diretamente no FormGroup
          this.formGroupParent.get('cpf_cnpj')?.setValue(data.cpf);
          this.formGroupParent.get('cpf_cnpj')?.disable();

          // Desabilitar o campo rg diretamente no FormGroup
          this.formGroupParent.get('rg')?.setValue(data.cpf);
          this.formGroupParent.get('rg')?.disable();

          // Desabilitar o campo orgao_emissor diretamente no FormGroup
          this.formGroupParent.get('orgao_emissor')?.setValue(data.cpf);
          this.formGroupParent.get('orgao_emissor')?.disable();

          // Desabilitar o campo nome diretamente no FormGroup
          // this.formGroupParent.get('nome')?.setValue(data.cpf);
          // this.formGroupParent.get('nome')?.disable();

          // Mapeamento entre os campos da API e os campos do formulário
          const mapeamento: { [key: string]: string } = {
            cpf: 'cpf_cnpj',
            endereco: 'endereco',
            nome: 'nome',
            telefone: 'telefone',
            email: 'email',
            rg: 'rg',
            orgao_emissor: 'orgao_emissor',
            estado_civil: 'estado_civil',
            profissao_ocupacao: 'profissao_ocupacao',
            chave_pix: 'chave_pix',
            pix: 'pix',
            conta_bancaria: 'conta_bancaria',
            dt_nascimento: 'dt_nascimento',
            nome_pai: 'nome_pai',
            nome_mae: 'nome_mae'
          };

          // Criando o objeto com as chaves corrigidas
          const dadosCorrigidos: { [key: string]: any } = {};
          for (const [campoApi, campoForm] of Object.entries(mapeamento)) {
            if (data[campoApi] !== undefined) {
              dadosCorrigidos[campoForm] = data[campoApi];
            }
          }

          // Atualizando o formulário com os campos corrigidos
          this.formGroupParent.patchValue(dadosCorrigidos);
        },
        error: (err) => {
          console.error('Erro ao carregar dados:', err);
        }
      });
    }
  }

  salvar(){
    if(this.formGroupParent.valid){
      if(this.tipoPessoa ==='proprietario'){
        const proprietarioAtualizado = {
        nome: this.formGroupParent.value.nome,
        telefone: this.formGroupParent.value.telefone,
        endereco: this.formGroupParent.value.endereco,
        conta_bancaria: this.formGroupParent.value.conta_bancaria,
        pix: this.formGroupParent.value.pix,
        chave_pix: this.formGroupParent.value.chave_pix,
        estado_civil: this.formGroupParent.value.estado_civil,
        profissao_ocupacao: this.formGroupParent.value.profissao_ocupacao,
        email: this.formGroupParent.value.email
        };
        this.proprietarioService.updateProprietario(this.id_pessoa, proprietarioAtualizado).subscribe({
          next: () => {
            alert(`${this.tipoPessoa} atualizado com sucesso.`)
          },
          error: (error) => {
            let mensagemErro = 'Erro ao atualizar o Contrato';
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
      else if (this.tipoPessoa ==='inquilino'){
        const inquilinoAtualizado = {
          nome: this.formGroupParent.value.nome,
          telefone: this.formGroupParent.value.telefone,
          estado_civil: this.formGroupParent.value.estado_civil,
          profissao_ocupacao: this.formGroupParent.value.profissao_ocupacao,
          email: this.formGroupParent.value.email
        };

        this.inquilinoService.updateInquilino(this.id_pessoa, inquilinoAtualizado).subscribe({
          next: () => {
            alert(`${this.tipoPessoa} atualizado com sucesso.`)
          },
          error: (error) => {
            let mensagemErro = 'Erro ao atualizar o Contrato';
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
    }
  }

  voltar(): void {
    this.location.back();
  }

}
