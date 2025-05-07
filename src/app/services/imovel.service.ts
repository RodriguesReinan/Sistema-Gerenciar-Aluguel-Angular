import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private endpoint = '/imoveis';
  private apiUrl = `${environment.apiUrl}${this.endpoint}`;

  constructor(private http: HttpClient) { }


  createImovel(proprietario: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/`, proprietario);
  }


  getImovel(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/imoveis-disponiveis`);
  }


  getImovelById(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  updateImovel(id: number, proprietario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, proprietario);
  }


  deleteImovel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}

