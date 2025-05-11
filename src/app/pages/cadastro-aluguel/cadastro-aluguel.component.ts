import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms'
import { Router } from '@angular/router';
import { CadastroAluguelService } from '../../services/cadastro-aluguel.service'
import { ImovelService } from '../../services/imovel.service'
import { InquilinoService } from '../../services/inquilino.service'
import { PagamentoService } from '../../services/pagamento.service'
import { LoginService } from 'src/app/services/login.service';
import { ContratoPdfViewService } from 'src/app/services/contrato-pdf-view.service';

@Component({
  selector: 'app-cadastro-aluguel',
  templateUrl: './cadastro-aluguel.component.html',
  styleUrls: ['./cadastro-aluguel.component.css']
})
export class CadastroAluguelComponent implements OnInit {
  cadastroForm!: FormGroup;
  alugueis: any[] = [];
  imoveis: any[] = [];
  inquilinos: any[] = [];
  pagamentos: any[] = [];
  VcontratoModeloPdf = {}
  VmodelosPdfIds: any[] = []
  editandoContratoAluguel: string | null = null; // Define se está no modo de edição


  constructor(
    private fb: FormBuilder,
    private aluguelService: CadastroAluguelService,
    private imovelService: ImovelService,
    private inquilinoService: InquilinoService,
    private pagamentoService: PagamentoService,
    private loginService: LoginService,
    private contratoModeloPdf: ContratoPdfViewService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      data_inicio: [''],
      data_fim: [''],
      dia_vencimento: [''],
      valor_mensal: [''],
      taxa_limpeza: [''],
      status: [''],
      cpf_inquilino: [''], // campo para o inquilino
      nome_inquilino: [''],
      endereco_imovel: [''], // campo para o imóvel
      usuario_id: ['']  // campo oculto
    });
    this.listarIdsModelosPDF()
    this.carregarAlugueis();
    this.carregarInquilinos();
    this.carregarImoveis();
    this.dados_usuario_logado();
  }

  dados_usuario_logado(){
    // obtendo o id do usuário
    this.loginService.get_user_id().subscribe({
      next: (userData) => {
        const userEmail = userData?.email;
        const userId = userData?.id;

        if (userId){
          this.cadastroForm.patchValue({usuario_id: userId});
        }
      },
    });
  }

  carregarInquilinos(){
    this.inquilinoService.getInquilinos().subscribe({
      next: (data) => {
        this.inquilinos = data
      },
      complete: () => {}
    });
  }

  carregarImoveis(){
    this.imovelService.getImovel().subscribe({
      next: (data) => {
        this.imoveis = data;
        // console.log(data);
      },
      // error: (erro) => {
        // let mensagemErro = 'Erro ao realizar o cadastro. Tente novamente';

        // if (erro.message){
          // mensagemErro = `Erro: ${erro.message}`;
        // }
        // else if (erro.status && erro.message) {
          // mensagemErro = `Erro ${erro.status}: ${erro.erro.message || erro.erro}`;
        // }
        // window.alert(mensagemErro);
      // },
      complete: () => {}
    });
  }

  carregarAlugueis(){
    this.aluguelService.getAlugueis().subscribe({
      next: (data) => {
        this.alugueis = data;
        // console.log('this.alugueis', this.alugueis)
      },
      // error: (erro) => {
        // let mensagemErro = 'Erro ao carregar os alugueis';

        // if (erro.message){
          // mensagemErro = `Erro: ${erro.message}`;
        // }
        // else if (erro.status && erro.message) {
          // mensagemErro = `Erro ${erro.status}: ${erro.erro.message || erro.erro}`;
        // }
        // window.alert(mensagemErro);
      // },
      complete: () => {}
    });
  }

  carregarPagamentosPorContrato(contratoId: string){
    if (!contratoId){
      window.alert('Contrato inválido.');
      return;
    }

    this.pagamentoService.get_pagamento_por_contrato(contratoId).subscribe({
      next: (data) => {
        this.pagamentos = data
      },
      // error: (erro) => {
        // let mensagemErro = 'Erro ao carregar os pagamentos';
        // if (erro.message) {
          // mensagemErro = `Erro: ${erro.message}`;

        // }
        // else if (erro.status && erro.message){
          // mensagemErro = `Erro: ${erro.status}: ${erro.erro.message || erro.erro}`;
        // }
        // window.alert(mensagemErro);
      // },
      complete: () => {}
    });

    // Usando router para navegar e passar o contratoId como parâmetro
    this.router.navigate([`/consultar-pagamentos`, contratoId]);  // Passando contratoId para a nova página
  }

  carregarContratoPdfPorContrato(contrato_modelo_id: string, contrato_aluguel_id: string){
    if (!contrato_modelo_id){
      window.alert('Contrato inválido.');
      return;
    }

    this.contratoModeloPdf.gerarHtmlContrato(contrato_modelo_id, contrato_aluguel_id).subscribe({
      next: (data) => {
        this.VcontratoModeloPdf = data
        // console.log('contratos seilá', this.VcontratoModeloPdf);
      },
      // error: (erro) => {
        // let mensagemErro = 'Erro ao carregar os pagamentos';
        // if (erro.message) {
          // mensagemErro = `Erro: ${erro.message}`;

        // }
        // else if (erro.status && erro.message){
          // mensagemErro = `Erro: ${erro.status}: ${erro.erro.message || erro.erro}`;
        // }
        // window.alert(mensagemErro);
      // },
    });
    // Usando router para navegar e passar o contratoId como parâmetro
    this.router.navigate([`/contrato-pdf`, contrato_modelo_id], {
      queryParams: {contrato_aluguel_id: contrato_aluguel_id}
    });  // Passando contratoId do modelo pdf e o contrato_id do contrato-aluguel para a nova página
  }

  listarIdsModelosPDF(){
    this.contratoModeloPdf.listarModelosContratoPdf().subscribe({
      next: (data) => {
        this.VmodelosPdfIds = data;
      },
      error: (err) => {
        window.alert('Erro ao buscar o modelo de contrato PDF.')
      },
      complete: () => {}
    })
  }

  _gerarContratoPdf(contrato_aluguel_id: string){
    const modeloPadrao = this.VmodelosPdfIds[0] // o primeiro id da lista de contratos retornados
    if (!modeloPadrao){
      window.alert('Nenhum modelo de contrato encontrado.')
      return
    }

    const contrato_modelo_pdf_id = modeloPadrao.id;

    this.carregarContratoPdfPorContrato(contrato_modelo_pdf_id, contrato_aluguel_id);
  }

  editar(id_contrato_aluguel: string){
    this.editandoContratoAluguel = id_contrato_aluguel;
  }

  salvar_edicao(aluguel: any) {
    // Criar um novo objeto sem os campos que não podem ser editados
    const aluguelAtualizado = {
      //data_vencimento: parcela.data_vencimento,
      data_fim: aluguel.data_fim,
      dia_vencimento: aluguel.dia_vencimento,
      valor_mensal: aluguel.valor_mensal,
      status: aluguel.status,
      taxa_limpeza: aluguel.taxa_limpeza
    };

    this.aluguelService.edit_aluguel(aluguel.id, aluguelAtualizado).subscribe({
      next: () => {
        this.editandoContratoAluguel = null;
        // console.log('parcela', aluguelAtualizado);
        alert('Contrato Aluguel atualizado com sucesso!');
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

  salvar(){
    // console.log(this.cadastroForm.status, this.cadastroForm.errors, this.cadastroForm);

    if (this.cadastroForm.invalid) {
      window.alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const formValue = this.cadastroForm.value;
    const inquilinoSelecionado = this.inquilinos.find(i => i.cpf === formValue.cpf_inquilino);
    const imovelSelecionado = this.imoveis.find(i => i.id === formValue.endereco_imovel);

    // nomes das propriedades devem ser iguais aos nomes na api, contratos/schema.py
    const novoAluguel = {
      data_inicio: formValue.data_inicio,
      data_fim: formValue.data_fim,
      dia_vencimento: formValue.dia_vencimento,
      valor_mensal: parseFloat(formValue.valor_mensal),
      taxa_limpeza: parseFloat(formValue.taxa_limpeza),
      status: formValue.status,

      inquilino: {
        cpf: formValue.cpf_inquilino,
        nome: inquilinoSelecionado?.nome || ''
      },
      imovel: {
        id: formValue.endereco_imovel,
        endereco: imovelSelecionado?.endereco || '',
        numero: imovelSelecionado?.numero || '',
        bairro: imovelSelecionado?.bairro || ''
      },
      usuario: {
        id: formValue.usuario_id
      }
    };

    // console.log('Dados do aluguel a serem enviados: 01', novoAluguel);
    this.aluguelService.createAluguel(novoAluguel).subscribe({
      next: (response) => {
        this.carregarAlugueis();  // Atualiza a lista
        // console.log('Aluguel cadastrado com sucesso!', response);
        window.alert('Aluguel cadastrado com sucesso!');

        // ✅ Atualize a lista de imóveis disponíveis
        this.carregarImoveis();

        this.cadastroForm.reset();
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

}
