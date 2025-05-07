import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PagamentoService {
  private endpoint = '/pagamentos';
  private apiUrl = `${environment.apiUrl}${this.endpoint}`;

  constructor(private http: HttpClient) { }

  getAllPagamentos(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/`);
  }

  getPagamentoById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  get_pagamento_por_contrato(contratoId: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/contrato/${contratoId}`);

  }

  edit_pagamento(id: string, dados: any): Observable<any>{
    return this.http.patch<any>(`${this.apiUrl}/${id}`, dados);
  }

}
