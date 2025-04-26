import { Component, EventEmitter, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { ProprietarioService } from '../../services/proprietario.service';
import { ImovelService } from '../../services/imovel.service';

@Component({
  selector: 'app-cadastro-imovel',
  templateUrl: './cadastro-imovel.component.html',
  styleUrls: ['./cadastro-imovel.component.css']
})
export class CadastroImovelComponent implements OnInit {
  cadastroForm!: FormGroup;
  endereco: any = {};
  proprietarios: any[] = [];

  constructor(private fb: FormBuilder, private proprietarioService: ProprietarioService, private imovelService: ImovelService) { }

  ngOnInit(): void {
    this.cadastroForm = this.fb.group({
      cpf_proprietario: [''], // Campo para CPF do proprietário
      tipo_imovel: [''],
      casa_apartamento: [''],
      aluguel_venda: [''],
      area_total: [''],
      quartos: [''],
      suites: [''],
      banheiros: [''],
      descricao: ['']
    });
    this.carregarProprietarios();
  }

  carregarProprietarios(){
    this.proprietarioService.getProprietarios().subscribe({
      next: (data) =>{
        this.proprietarios = data
        console.log(data);
      },
      error: (error) => {
        let mensagemErro = 'Erro ao realizar o cadastro. Tente novamente';

        if (error.message){
          mensagemErro = `Erro: ${error.message}`;
        }
        else if (error.status && error.error){
          mensagemErro = `Erro ${error.status}: ${error.error.message || error.error}`;
        }
        window.alert(mensagemErro);
      },
      complete: () => {}
  });
  }

  salvar(){
    // O endereço pode ser atualizado de um componente separado
    const endereco = this.endereco;
    const formValue = this.cadastroForm.value;

     // nomes das propriedades devem ser iguais aos nomes na api
    const novoImovel = {
      endereco: `${endereco.cep}, ${endereco.logradouro}, ${endereco.numero}, ${endereco.bairro}, ${endereco.localidade} - ${endereco.uf}`,
      tipo_imovel: formValue.tipo_imovel,
      casa_apartamento: formValue.casa_apartamento,
      aluguel_venda: formValue.aluguel_venda,
      area_total: parseFloat(formValue.area_total),
      qtd_quartos: parseInt(formValue.quartos, 10),
      qtd_suites: parseInt(formValue.suites, 10),
      qtd_banheiros: parseInt(formValue.banheiros, 10),
      descricao: formValue.descricao || "",

      proprietario:{
        cpf: formValue.cpf_proprietario
      }
    };

    console.log('Dados do imóvel a serem enviados:', novoImovel);
    console.log('esta é a cpf proprietário: ', formValue.cpf_proprietario);

    this.imovelService.createImovel(novoImovel).subscribe({
      next: (response) => {
        console.log('Imóvel cadastrado com sucesso!', response);
        window.alert('Imóvel cadastrado com sucesso!');
        this.cadastroForm.reset();
      },
      error: (error) => {
        let mensagemErro = 'Erro ao realizar o cadastro. Tente novamente';

        if (error.message){
          mensagemErro = `Erro: ${error.message}`;
        }
        else if (error.status && error.error){
          mensagemErro = `Erro ${error.status}: ${error.error.message || error.error}`;
        }
        window.alert(mensagemErro);
      },
      complete: () => {}
    });

  }

  get infoImovelForm(): FormGroup {
    return this.cadastroForm.get('infoImovel') as FormGroup;
  }

  enderecoForm(dados: any) {
    this.endereco = dados;
    console.log('Endereço atualizado:', this.endereco);
  }

}

