import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProprietarioService {
  private endpoint = '/proprietarios';
  private apiUrl = `${environment.apiUrl}${this.endpoint}`;

  constructor(private http: HttpClient) { }


  createProprietario(proprietario: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/`, proprietario);
  }


  getProprietarios(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/`);
  }


  getProprietarioById(id: string): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  updateProprietario(id: number, proprietario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, proprietario);
  }


  deleteProprietario(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
