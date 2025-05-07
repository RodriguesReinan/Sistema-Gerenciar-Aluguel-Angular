import { Component, OnInit } from '@angular/core';
import { ProprietarioService } from 'src/app/services/proprietario.service';
import { InquilinoService } from 'src/app/services/inquilino.service';

@Component({
  selector: 'app-consulta-pessoas',
  templateUrl: './shared-consulta-pessoas.component.html',
  styleUrls: ['./shared-consulta-pessoas.component.css']
})
export class SharedConsultaPessoasComponent implements OnInit {
  pessoas: any[] = [];
  pessoasFiltradas: any[] = [];
  oQueePessoa: string = ''
  paginaAtual = 1;
  itensPorPagina = 5;

  // Filtros
  filtroNome: string = '';
  filtroDocumento: string = '';
  filtroTipo: string = '';
  tipoPessoa: string = '';

  constructor(
    private proprietarioService: ProprietarioService,
    private inquilinoService: InquilinoService
  ) {}

  ngOnInit(): void {
    this.tipoPessoa = '';
  }

  carregarPessoas(){
    if (!this.tipoPessoa){
      this.pessoas = [];
      this.aplicarFiltros();
      return;
    }

    let service;
    switch(this.tipoPessoa) {
      case 'proprietario':
        this.oQueePessoa = 'Proprietário'
        service = this.proprietarioService.getProprietarios();
        break;
      case 'inquilino':
        this.oQueePessoa = 'Inquilino'
        service = this.inquilinoService.getInquilinos();
        break;
      default:
        this.pessoas = [];
        return;
    }

    service.subscribe(data => {
    //console.log(`${this.tipoPessoa}s recebidos: `, data);
    this.pessoas = data;
    this.aplicarFiltros();
    });
  }

  aplicarFiltros(){
    this.pessoasFiltradas = this.pessoas.filter(pessoa => {
      return(
        (!this.filtroNome || pessoa.nome.toLowerCase().includes(this.filtroNome.toLocaleLowerCase()))&&
        (!this.filtroDocumento || pessoa.cpf.includes(this.filtroDocumento)) &&
        (!this.filtroTipo || pessoa.tipo === this.filtroTipo)
      );
    });
    this.paginaAtual = 1;
  }

  // Métodos para edição, exclusão e detalhes
  editar(pessoa: any) {
    console.log('Editar:', pessoa);
  }

  excluir(pessoa: any) {
    if (confirm(`Tem certeza que deseja excluir ${pessoa.nome}?`)) {
      console.log('Excluir:', pessoa);
    }
  }

  detalhes(pessoa: any) {
    console.log('Detalhes:', pessoa);
  }

  getPessoasPaginadas(){
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    return this.pessoasFiltradas.slice(inicio, inicio + this.itensPorPagina);
  }

  paginaAnterior(){
    if (this.paginaAtual > 1){
      this.paginaAtual --;
    }
  }

  proximaPagina(){
    if (this.paginaAtual * this.itensPorPagina < this.pessoasFiltradas.length){
      this.paginaAtual++;
    }
  }

  novoCadastro(){}

}
