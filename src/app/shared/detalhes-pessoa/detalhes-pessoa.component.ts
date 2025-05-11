import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ProprietarioService } from '../../services/proprietario.service';
import { ImovelService } from '../../services/imovel.service';
import { InquilinoService } from '../../services/inquilino.service';
import { CadastroAluguelService } from '../../services/cadastro-aluguel.service';


@Component({
  selector: 'app-detalhes-pessoa',
  templateUrl: './detalhes-pessoa.component.html',
  styleUrls: ['./detalhes-pessoa.component.css']
})
export class DetalhesPessoaComponent implements OnInit {
  @Input() pessoa: any;
  tipoPessoa!: string;
  id_pessoa!: string;
  lista_alugueis: any;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private inquilinoService: InquilinoService,
    private proprietarioService: ProprietarioService,
    private listaAlugueis: CadastroAluguelService,
    private imovel: ImovelService,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(parametros => {
      this.tipoPessoa = parametros['tipo'];
      const id = parametros['id'];
      if (id){
        this.carregarDados(id);
      }
    });

  }


  carregarDados(id: string): void{
    this.id_pessoa = id;
    if(this.tipoPessoa === 'proprietario'){

      this.proprietarioService.getProprietarioById(id).subscribe({
        next: (data) => {

          // Verifica se a conta bancária é uma string com vírgulas
          if (typeof data.conta_bancaria === 'string') {
              // Remove espaços em branco e separa por vírgula
              const partes: string[] = data.conta_bancaria.split(',').map(
                (part: string) => part.trim()).filter(
                  (part: string) => part);
              // Junta novamente sem elementos vazios
              data.conta_bancaria = partes.join(', ');
          }

          this.pessoa = data;

          this.imovel.getImovel().subscribe({
            next: (imoveis) => {
              // Filtra os imóveis que pertencem ao proprietário atual pelo CPF
              this.pessoa.imoveis_prop = imoveis.filter((imovel: any) =>{
                return imovel.proprietario?.cpf.replace(/[^0-9]/g, '') === this.pessoa.cpf.replace(/[^0-9]/g, '');
            });
              }
          });

        },
        error: (err) => {
          console.error('Erro ao carregar dados:', err);
        }

      });
    }
    else if (this.tipoPessoa === 'inquilino'){
      this.inquilinoService.getInquilinoById(id).subscribe({
        next: (data) => {
          this.pessoa = data;

          this.listaAlugueis.getAlugueis().subscribe({
            next: (alugueis) => {
              this.pessoa.contratos = alugueis.filter((aluguel: any)=>
                aluguel.inquilino && aluguel.inquilino.cpf === this.pessoa.cpf
              );
              console.log('Contratos do Inquilino:', this.pessoa.contratos);
            }
          });
        },
        error: (err) => {
          console.error('Erro ao carregar dados:', err);
        }
      });
    }
  }

  editar(pessoa: any) {
    this.router.navigate(['/editar-pessoa/', this.tipoPessoa, pessoa.id]);
  }

  voltar(): void {
    this.location.back();
  }

}
