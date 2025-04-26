import { Injectable } from '@angular/core';
import {environment} from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CepData } from 'src/app/models/cepData'

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private baseUrl:string = ''
  cep_data: CepData | any


  constructor(private http:HttpClient) {
    this.baseUrl = environment.cepAPI
   }

   buscarCEP(cep:string):Observable<CepData>{
    const cepNumerico = cep.replace(/\D/g, ''); // remove caracteres nao numéricos
    if (cepNumerico.length != 8){
      alert('CEP inválido. Insira 8 dígitos, com ou sem hífen.');
      throw new Error('CEP inválido'); // Interrompe a execução em caso de erro
    }

    return this.http.get<CepData>(`${this.baseUrl}${cepNumerico}/json/`)
  }

}
