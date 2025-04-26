import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class CadastroAluguelService {

  private apiUrl = 'http://localhost:8000/contrato-aluguel';

  constructor(private http: HttpClient ) { }

  createAluguel(aluguel: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/`, aluguel)
  }

  getAlugueis(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/`)
  }

  edit_aluguel(id_contrato_aluguel: string, dados: any): Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/${id_contrato_aluguel}`, dados)
  }

}
