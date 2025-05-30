import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CadastroAluguelService {
  private endpoint = '/contrato-aluguel';

  private apiUrl = `${environment.apiUrl}${this.endpoint}`;

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
