import { Component, OnInit } from '@angular/core';
import { CepData } from 'src/app/models/cepData';
import { CepService } from 'src/app/services/cep.service';

@Component({
  selector: 'app-endereco',
  templateUrl: './endereco.component.html',
  styleUrls: ['./endereco.component.css']
})
export class EnderecoComponent implements OnInit {
  endereco: CepData = {
    cep: '',
    numero: '',
    complemento: '',
    bairro: '',
    uf: '',
    logradouro: '',
    localidade: ''
  };

  constructor(private service: CepService) {}

  ngOnInit(): void {}

  buscarEndereco(): void {
    if (this.endereco.cep) {
      this.service.buscarCEP(this.endereco.cep).subscribe({
        next: (data) => {
          this.endereco = {
            cep: this.endereco.cep,
            bairro: data.bairro,
            uf: data.uf,
            logradouro: data.logradouro, // rua
            localidade: data.localidade, // cidade
            numero: data.numero,
            complemento: data.complemento,
          };
        },
        error: (error) => {
          console.error('Erro ao buscar o CEP:', error);
          alert('Erro ao buscar o CEP!');
        },
        complete: () => {
          console.log('Busca de CEP concluída.');
        }
      });
    }
  }
}
