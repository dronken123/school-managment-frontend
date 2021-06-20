import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Clase } from '../models/clase';
import { Empleado } from '../models/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private urlEndPoint: string = 'http://localhost:8080/api/empleados';

  constructor(private http: HttpClient) { }

  getEmpleados(): Observable<any>{
    return this.http.get(this.urlEndPoint)
               .pipe(
                 map((response: any) => {
                   response.content as Empleado[];
                   return response;
                 })
               )
  }

  getEmpleadoByDni(dni: string): Observable<Empleado> {
    let params = new HttpParams();
    params = params.set('dni', dni);
    return this.http.get<Empleado>(`${this.urlEndPoint}/buscarDni`, {params: params});
  }

  getClasesEmpleado(id: string): Observable<Clase[]>{
    let params = new HttpParams();
    params = params.set('id', id);
    return this.
    http.get<Clase[]>(this.urlEndPoint+'/clases', {params: params})
  }

  saveEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.http.post<Empleado>(this.urlEndPoint+'/crear', empleado)
               .pipe(
                 catchError(e => {
                   if(e.status == 400){
                    return throwError(e);
                   }

                   console.log(e.error.mensaje)
                   console.error(e.error.errors)

                   return throwError(e);
                 })
               );
  }

  getEmpleado(id: number): Observable<Empleado>{
    return this.http.get<Empleado>(`${this.urlEndPoint}/${id}`);
  }

  updateEmpleado(empleado: Empleado): Observable<Empleado>{
    return this.http.put<Empleado>(`${this.urlEndPoint}/${empleado.id}`, empleado)
               .pipe(
                catchError(e => {
                  if(e.status == 400){
                   return throwError(e);
                  }

                  console.log(e.error.mensaje)
                  console.error(e.error.errors)

                  return throwError(e);
                })
              );
  }

  deleteEmpleado(id: number): Observable<Empleado>{
    return this.http.delete<Empleado>(`${this.urlEndPoint}/${id}`);
  }
}
