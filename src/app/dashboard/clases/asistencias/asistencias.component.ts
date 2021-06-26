import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asistencia } from 'src/app/models/asistencia';
import { Estudiante } from 'src/app/models/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css']
})
export class AsistenciasComponent implements OnInit {

  fecha: Date = new Date();
  fechaActual: string = '';
  fechapasada: string = '';
  fechaasada1: string = '';

  idAula: string = '';
  idClase: string = '';

  asistenciaPrueba: Asistencia[] = [];
  estudiantes: Estudiante[] = [];
  constructor(private aulaService: AulaService, private activatedRoute: ActivatedRoute, private estudianteService: EstudianteService, private router: Router) { }

  ngOnInit(): void {
    this.cargarDatos()

    this.fechaActual = this.fecha.getDate() + '/' + (this.fecha.getMonth()+1) + '/' + this.fecha.getFullYear();
    // this.fechapasada = (this.fecha.getDate()-1) + '/' + (this.fecha.getMonth()+1) + '/' + this.fecha.getFullYear();
    // this.fechaasada1 = (this.fecha.getDate()-2) + '/' + (this.fecha.getMonth()+1) + '/' + this.fecha.getFullYear();
    
  }

  cargarDatos(){
    this.activatedRoute.params.subscribe( params => {
      let idAula: string = params['idAula'];
      this.idClase = params['idClase'];
      this.idAula = params['idAula'];

      this.aulaService.getEstudiantesAula(idAula).subscribe(response => {
        this.estudiantes = response;
        this.estudiantes.forEach(e => {
          let a: Asistencia = new Asistencia();
          a.fechaExist = this.fechaActual;
          e.asistencias.push(a);
          
        })
        console.log(this.estudiantes)
      });
    })
  }

  regresar(): void {
    this.router.navigate([`dashboard/aulas/${this.idAula}/clases/${this.idClase}`]);
  }

  cargarAsistencia(): void {
    this.estudiantes.forEach(e => {
      this.estudianteService.updateEstudiante(e).subscribe();
    });
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Se registró la asistencia!',
      showConfirmButton: false,
      timer: 1000
    })
    this.router.navigate([`dashboard/aulas/${this.idAula}/clases/${this.idClase}`]);
    
    console.log(this.estudiantes);
    
  }

  asistencia(estudiante: Estudiante, estado: string){
    let encontrado = false;
    let asistencias: Asistencia[] = estudiante.asistencias.reverse();
    console.log(asistencias);
    asistencias.forEach(a => {
      if(a.fechaExist === undefined || this.fechaActual === a.fechaExist){
        a.estado = estado;
        encontrado = true;
        console.log('encontrado')
        return
      }

    })

          
    if(!encontrado){
      let asistencia = new Asistencia();
      asistencia.estado = estado;
      // console.log('estudiante', estudiante);
      // console.log('estado', estado);
      asistencias.push(asistencia);
      
    }

    //SOLUCIONAR LA ASISTENCIA QUE SE CREA PARA VERIFICAR

    estudiante.asistencias = asistencias.reverse();
  }


}
