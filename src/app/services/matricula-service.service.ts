import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiaSemana } from '../models/dia-semana';
import { Matricula } from '../models/matricula';
import { Nivel } from '../models/nivel';
import { Turno } from '../models/turno';

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private urlEndPoint: string = 'http://localhost:8080/api/matriculas';

  constructor(private http: HttpClient) { }

  saveMatricula(matricula: Matricula): Observable<Matricula>{
    return this.http.post<Matricula>(this.urlEndPoint+'/crear', matricula);
  }

  getTurnos(): Observable<Turno[]>{
    return this.http.get<Turno[]>(this.urlEndPoint+'/turnos');
  }

  getNiveles(): Observable<Nivel[]>{
    return this.http.get<Nivel[]>(this.urlEndPoint+'/niveles');
  }

  getDias(): Observable<DiaSemana[]>{
    return this.http.get<DiaSemana[]>(this.urlEndPoint+'/dias');
  }

}
