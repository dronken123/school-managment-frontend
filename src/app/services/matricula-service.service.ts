import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Matricula } from '../models/matricula';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private urlEndPoint: string = 'http://localhost:8080/api/matriculas';

  constructor(private http: HttpClient) { }

  saveMatricula(matricula: Matricula): Observable<Matricula>{
    return this.http.post<Matricula>(this.urlEndPoint+'/crear', matricula);
  }

}
