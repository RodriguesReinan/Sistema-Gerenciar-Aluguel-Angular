import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms'
import { InquilinoService } from '../../services/inquilino.service';

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
        cpf_cnpj: [''],
        telefone: ['']
      }),
    })
  }


  carregarInquilinos(){
    this.inquilinoService.getInquilino().subscribe(
      (data) => {
        this.inquilinos = data;
      },
      (error) => {
        console.error('Erro ao carregar os proprietários', error);
      }
    );
  }

  salvar(){
    const dadosPessoais = this.cadastroForm.get('dadosPessoais')?.value;

    const novoInquilino = {
      nome: dadosPessoais.nome,
      cpf: dadosPessoais.cpf_cnpj,
      telefone: dadosPessoais.telefone
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

  get dadosPessoaisForm(): FormGroup {
    return this.cadastroForm.get('dadosPessoais') as FormGroup;
  }

}
