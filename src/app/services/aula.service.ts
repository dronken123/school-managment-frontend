import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Aula } from '../models/aula';
import { Grado } from '../models/grado';

@Injectable({
  providedIn: 'root'
})
export class AulaService {

  private urlEndPoint: string = 'http://localhost:8080/api/aulas';

  constructor(private http: HttpClient) { }

  getAulas(): Observable<Aula[]>{
    return this.http.get<Aula[]>(this.urlEndPoint);
  }

  getAula(id:number): Observable<Aula>{
    return this.http.get<Aula>(`${this.urlEndPoint}/${id}`);
  }

  saveAula(aula: Aula): Observable<Aula>{
    return this.http.post<Aula>(this.urlEndPoint+'/crear', aula);
  }

  updateAula(aula: Aula): Observable<Aula>{
    return this.http.put<Aula>(`${this.urlEndPoint}/${aula.id}`, aula);
  }

}
