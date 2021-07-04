import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from '../models/clase';
import { Empleado } from '../models/empleado';
import { EmpleadoService } from '../services/empleado.service';
import { TokenService } from '../services/token.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  reporte: boolean = true;

  profesorActivo: boolean;
  adminActivo: boolean;
  empleado: Empleado = new Empleado();
  clases: Clase[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private tokenService: TokenService, private empleadoService: EmpleadoService) { }

  ngOnInit(): void {


    this.tokenService.isProfesor() ? this.profesorActivo = true : this.profesorActivo = false;
    this.tokenService.isAdmin() ? this.adminActivo = true : this.adminActivo = false;
    if(this.profesorActivo){
      this.cargarClasesProfesor();
    }
  }
  
  clear(): void {
  }

  irClase(clase: Clase): void {
    this.router.navigate([`/dashboard/aulas/${clase.aula.id}/clases/${clase.id}`]);
    this.profesorActivo = false;
    this.adminActivo = true;
    this.reporte = false;
  }

  cargarClasesProfesor(): void {
    this.empleadoService.getEmpleadoByDni(this.tokenService.getUsername())
    .subscribe(response => {
      this.empleado = response;
      this.empleadoService.getClasesEmpleado(this.empleado.id.toString())
          .subscribe(response => {
            this.clases = response;
          });
    });
  }
  

  mostrarEstudiantes(){
    this.router.navigate(['estudiantes/page/:page'], {relativeTo: this.route});
    this.reporte = false;
  }

  mostrarAulas(){
    this.router.navigate(['aulas'], {relativeTo: this.route})
    this.reporte = false;
  }

  mostrarGrados(){
    this.router.navigate(['grados'], {relativeTo: this.route});
    this.reporte = false;
  }
  
  mostrarCursos(){
    this.router.navigate(['cursos'], {relativeTo: this.route});
    this.reporte = false;
  }

  mostrarEmpleados(){
    this.router.navigate(['empleados'], {relativeTo: this.route});
    this.reporte = false;
  }

  mostrarDashboard(){
   this.reporte = true; 
   this.router.navigate(['dashboard']);
   this.tokenService.isProfesor() ? this.profesorActivo = true : this.adminActivo = true;
  }

  

}
