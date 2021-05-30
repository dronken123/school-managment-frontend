import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Clase } from '../models/clase';

@Injectable({
  providedIn: 'root'
})
export class ClaseService {

  private urlEndPoint: string = 'http://localhost:8080/api/clases';

  constructor(private http: HttpClient) { }

  getClases(): Observable<Clase[]>{
    return this.http.get<Clase[]>(this.urlEndPoint);
  }

  saveClase(clase: Clase): Observable<Clase>{
    return this.http.post<Clase>(this.urlEndPoint+'/crear', clase);
  }

  updateClase(clase: Clase): Observable<Clase>{
    return this.http.put<Clase>(`${this.urlEndPoint}/${clase.id}`, clase);
  }

  deleteClase(id: number): Observable<Clase>{
    return this.http.delete<Clase>(`${this.urlEndPoint}/${id}`)
  }

}
