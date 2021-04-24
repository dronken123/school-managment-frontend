import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Estudiante } from '../models/estudiante';

@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  private urlEndPoint: string = 'http://localhost:8080/api/estudiantes';

  constructor(private http: HttpClient) { }

  getEstudiantes(): Observable<any>{
    return this.http.get(this.urlEndPoint)
               .pipe(
                 map((response: any) => {
                   response.content as Estudiante[];
                   return response;
                 })
               )
  }

  saveEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.post<Estudiante>(this.urlEndPoint+'/crear', estudiante);
  }

  getEstudiante(id: number): Observable<Estudiante>{
    return this.http.get<Estudiante>(`${this.urlEndPoint}/${id}`);
  }

  updateEstudiante(estudiante: Estudiante): Observable<Estudiante>{
    return this.http.put<Estudiante>(`${this.urlEndPoint}/${estudiante.id}`, estudiante);
  }

  deleteEstudiante(id: number): Observable<Estudiante>{
    return this.http.delete<Estudiante>(`${this.urlEndPoint}/${id}`);
  }
}
