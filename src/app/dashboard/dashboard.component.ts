import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Clase } from '../models/clase';
import { Curso } from '../models/curso';
import { Empleado } from '../models/empleado';
import { Grado } from '../models/grado';
import { CursoService } from '../services/curso.service';
import { EmpleadoService } from '../services/empleado.service';
import { GradoService } from '../services/grado.service';
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


  eventsSubject: Subject<any> = new Subject<any>();
  cursos: Curso[] = [];
  grados: Grado[] = [];
  cursoId: number;
  gradoId: number;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private tokenService: TokenService,
              private empleadoService: EmpleadoService,
              private curoService: CursoService,
              private gradoService: GradoService) { }

  ngOnInit(): void {

    this.curoService.getCursos().subscribe(response => this.cursos = response);
    this.gradoService.getGrados().subscribe(response => this.grados = response);
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

  loadDataChart(): void {
    this.eventsSubject.next([this.cursoId, this.gradoId]);
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
