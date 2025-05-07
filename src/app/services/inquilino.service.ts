import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InquilinoService {
  private endpoint = '/inquilinos';
  private apiUrl = `${environment.apiUrl}${this.endpoint}`;

  constructor(private http: HttpClient) { }


  createInquilino(proprietario: any): Observable<any>{
    return this.http.post<any>(`${this.apiUrl}/`, proprietario);
  }


  getInquilinos(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/`);
  }


  getInquilinoById(id: number): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }


  updateInquilino(id: number, proprietario: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, proprietario);
  }


  deleteInquilino(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
