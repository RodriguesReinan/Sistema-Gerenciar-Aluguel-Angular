import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContratoPdfViewService {

  private apiUrl = 'http://localhost:8000/contrato-pdf'

  constructor(private http: HttpClient) { }

  gerarHtmlContrato(id: string, contrato_aluguel_id:string): Observable<{ html: string }>{
    return this.http.get<{ html: string }>(`${this.apiUrl}/${id}/html`, {params: { contrato_aluguel_id }, responseType: 'json'});
  }

  gerarPdfContrato(id: string, contrato_aluguel_id:string){
    return this.http.post(`${this.apiUrl}/${id}/preencher`, {}, {params: { contrato_aluguel_id }, responseType: 'blob'});  // // importante para baixar o PDF
  }

  listarModelosContratoPdf(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

}
