import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ImovelService {
  private apiUrl = 'http://localhost:8000/imoveis';

  constructor(private http: HttpClient) { }


  createImovel(proprietario: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/`, proprietario);
  }


  getImovel(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/`);
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

