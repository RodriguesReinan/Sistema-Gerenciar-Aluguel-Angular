import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContratoPdfViewService {

  private endpoint = '/contrato-pdf';
  private apiUrl = `${environment.apiUrl}${this.endpoint}`;

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
