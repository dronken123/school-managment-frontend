import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import Swal from 'sweetalert2';
import { Aula } from '../models/aula';
import { Clase } from '../models/clase';
import { Curso } from '../models/curso';
import { Empleado } from '../models/empleado';
import { Estudiante } from '../models/estudiante';
import { Grado } from '../models/grado';
import { AulaService } from '../services/aula.service';
import { CursoService } from '../services/curso.service';
import { EmpleadoService } from '../services/empleado.service';
import { EstudianteService } from '../services/estudiante.service';
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

  cantidadEstudiantes: number;
  cantidadProfesores: number;
  cantidadAulas: number;

  maxDate: Date;
  datePicked: Date;
  locale = 'es';
  bsConfig: Partial<BsDatepickerConfig>;


  eventsSubjectBar: Subject<any> = new Subject<any>();
  eventsSubjectPie: Subject<any> = new Subject<any>();
  cursos: Curso[] = [];
  grados: Grado[] = [];
  cursoId: number;
  gradoId: number;

  constructor(private route: ActivatedRoute,
              private estudianteService: EstudianteService,
              private router: Router,
              private tokenService: TokenService,
              private empleadoService: EmpleadoService,
              private aulaService: AulaService,
              private curoService: CursoService,
              private gradoService: GradoService,
              private localeService: BsLocaleService,
              private datePipe: DatePipe) { }

  ngOnInit(): void {

    this.bsConfig = Object.assign({}, { containerClass: 'theme-dark-blue' },{ isAnimated: true});

    this.empleadoService.getEmpleados()
        .subscribe((response: Empleado[]) => this.cantidadProfesores = response.length);
    this.estudianteService.getEstudiantes()
        .subscribe((response: Estudiante[]) => this.cantidadEstudiantes = response.length);

    this.aulaService.getAulas()
        .subscribe((response: Aula[]) => this.cantidadAulas = response.length);



    this.localeService.use(this.locale);
    this.maxDate = new Date();
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

  loadDataBarchart(): void {
    this.eventsSubjectBar.next([this.cursoId, this.gradoId]);
  }

  loadDataPiechart(): void {
    if(this.datePicked == undefined){
      Swal.fire('Upps','Elija una fecha para mostrar datos.','info');
      return
    }
    this.eventsSubjectPie.next(this.datePipe.transform(this.datePicked,'dd/MM/yyyy'));
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
