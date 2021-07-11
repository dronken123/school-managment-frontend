import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DiaSemana } from '../models/dia-semana';
import { Matricula } from '../models/matricula';
import { Nivel } from '../models/nivel';
import { Nota } from '../models/nota';
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

  getNotas(idCurso: string, idAula: string): Observable<Nota[]>{
    let params = new HttpParams();
    params = params.set('idCurso', idCurso);
    params = params.set('idAula', idAula);
    return this.http.get<Nota[]>(this.urlEndPoint+'/notas', {params: params});
  }

  actualizarNotas(notas: Nota[]): Observable<Nota[]>{
    return this.http.put<Nota[]>(this.urlEndPoint+"/notas", notas);
  }

}
