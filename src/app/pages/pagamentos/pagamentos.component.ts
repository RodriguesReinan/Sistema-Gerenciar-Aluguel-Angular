import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CadastroAluguelService } from '../../services/cadastro-aluguel.service'
import { PagamentoService } from '../../services/pagamento.service'

@Component({
  selector: 'app-pagamentos',
  templateUrl: './pagamentos.component.html',
  styleUrls: ['./pagamentos.component.css']
})
export class PagamentosComponent implements OnInit {
  cadastroForm!: FormGroup;
  pagamentos: any[] = [];
  contratos: any[] = [];
  contratoId!: string;
  editandoPagamentoId: string | null = null; // Define se está no modo de edição

    // paginação
    paginaAtual = 1;
    totalPaginas = 1;
    itensPorPagina = 10;
    listaCompleta: any[] = [] // todos os dados
    listaPaginada: any[] = []  // apenas os dados da página atual

  constructor(
    private pagamentoService: PagamentoService,
    private cadastroAluguel: CadastroAluguelService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Pegando o contratoId da rota
    this.route.paramMap.subscribe(params => {
      this.contratoId = params.get('id')!;
      this.carregarPagamentosPorContrato(this.contratoId);
    });

    //this.carregarPagamentos()
    this.carregarContratos()
  }


  carregarPagamentos(){
    this.pagamentoService.getAllPagamentos().subscribe({
      next: (data) => {
        this.pagamentos = data
      },
      error: (erro) => {
        let mensagemErro = 'Erro ao carregar os pagamentos';
        if (erro.message) {
          mensagemErro = `Erro: ${erro.message}`;

        }
        else if (erro.status && erro.message){
          mensagemErro = `Erro: ${erro.status}: ${erro.erro.message || erro.erro}`;
        }
        window.alert(mensagemErro);
      },
      complete: () => {}
    });
  }

  carregarContratos(){
    this.cadastroAluguel.getAlugueis().subscribe({
      next: (data) => {
        this.contratos = data
      },
      error: (erro) => {
        let mensagemErro = 'Erro ao carregar os pagamentos';
        if (erro.message) {
          mensagemErro = `Erro: ${erro.message}`;

        }
        else if (erro.status && erro.message){
          mensagemErro = `Erro: ${erro.status}: ${erro.erro.message || erro.erro}`;
        }
        window.alert(mensagemErro);
      },
      complete: () => {}
    });
  }

  carregarPagamentosPorContrato(contratoId: string){
    if (!this.contratoId){
      window.alert('Contrato inválido.');
      return;
    }

    this.pagamentoService.get_pagamento_por_contrato(contratoId).subscribe({
      next: (data) => {
        this.pagamentos = data;
        this.atualizarPaginacaoPagamentos();  // Atualiza a paginação após receber os dados
      },
      error: (erro) => {
        let mensagemErro = 'Erro ao carregar os pagamentos';
        if (erro.message) {
          mensagemErro = `Erro: ${erro.message}`;

        }
        else if (erro.status && erro.message){
          mensagemErro = `Erro: ${erro.status}: ${erro.erro.message || erro.erro}`;
        }
        window.alert(mensagemErro);
      },
      complete: () => {}
    });
  }

  editar(parcelaId: string){
    this.editandoPagamentoId = parcelaId;
  }

  salvar(parcela: any) {
    // Criar um novo objeto sem os campos que não podem ser editados
    const parcelaAtualizada = {
      //data_vencimento: parcela.data_vencimento,
      data_pagamento: parcela.data_pagamento,
      metodo_pagamento: parcela.metodo_pagamento,
      status: parcela.status,
      valor_pago: parcela.valor_pago
    };

    this.pagamentoService.edit_pagamento(parcela.id, parcelaAtualizada).subscribe({
      next: () => {
        this.editandoPagamentoId = null;
        alert('Pagamento atualizado com sucesso!');
      },
      error: (erro) => {
        let mensagemErro = 'Erro ao carregar os pagamentos';
        if (erro.message) {
          mensagemErro = `Erro: ${erro.message}`;

        }
        else if (erro.status && erro.message){
          mensagemErro = `Erro: ${erro.status}: ${erro.erro.message || erro.erro}`;
        }
        window.alert(mensagemErro);
      },
      complete: () => {}

    });
  }

  atualizarPaginacaoPagamentos(){
    this.listaCompleta = this.pagamentos;
    const inicio = (this.paginaAtual -1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.listaPaginada = this.listaCompleta.slice(inicio, fim);

    // Atualizando o número total de páginas
    this.totalPaginas = Math.ceil(this.listaCompleta.length / this.itensPorPagina);
  }

  proximaPagina(){
    const totalPaginas = Math.ceil(this.listaCompleta.length / this.itensPorPagina);
    if (this.paginaAtual < totalPaginas){
      this.paginaAtual++;
      this.atualizarPaginacaoPagamentos();
    }
  }

  paginaAnterior(){
    if (this.paginaAtual > 1){
      this.paginaAtual--;
      this.atualizarPaginacaoPagamentos();
    }
  }

}
