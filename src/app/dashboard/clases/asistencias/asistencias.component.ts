import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
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

  idAula: string;
  idClase: string;

  asistenciaPrueba: Asistencia[] = [];
  estudiantes: Estudiante[] = [];
  constructor(private aulaService: AulaService, private activatedRoute: ActivatedRoute, private estudianteService: EstudianteService, private router: Router) { }

  ngOnInit(): void {
    this.cargarDatos()

    this.fechaActual = this.fecha.getDate() + '/' + (this.fecha.getMonth()+1) + '/' + this.fecha.getFullYear();
    
  }

  cargarDatos(){
    this.activatedRoute.params.subscribe( params => {
      let idAula: string = params['idAula'];
      this.idClase = params['idClase'];
      this.idAula = params['idAula'];
      console.log(this.idClase)

      this.aulaService.getEstudiantesAula(idAula).subscribe(response => {
        this.estudiantes = response;
        this.estudiantes.forEach(e => {

          if(e.asistencias.length == 0){
            let asitencia: Asistencia = new Asistencia();
              asitencia.fechaExist = this.fechaActual;
              console.log()
              e.asistencias.push(asitencia);
          }

          e.asistencias.forEach(a => {
            console.log(a.fecha, this.fechaActual)
            if(a.fecha != this.fechaActual){
              let asitencia: Asistencia = new Asistencia();
              asitencia.fechaExist = this.fechaActual;
              console.log()
              e.asistencias.push(asitencia);
            }
            e['asistenciaHoy'] = a.estado;
          })

        })
      });
    })
  }

  cargarAsistencia(): void {
      this.estudianteService.actualizarAsistencia(this.estudiantes)
        .subscribe(response => {

          Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Se registró la asistencia!',
            showConfirmButton: false,
            timer: 1000
          })
          this.router.navigate([`dashboard/aulas/${this.idAula}/clases/${this.idClase}`]);
          
          console.log(this.estudiantes);
        });
  
    
  }

  asistencia(estudiante: Estudiante, estado: string){
    let encontrado = false;
    let asistencias: Asistencia[] = estudiante.asistencias.reverse();

    for(let i=estudiante.asistencias.length;i > estudiante.asistencias.length-1; i--){
      console.log('asistencia',estudiante.asistencias[i-1]);
      if(estudiante.asistencias[i-1].fechaExist === undefined || this.fechaActual === estudiante.asistencias[i-1].fechaExist){
        estudiante.asistencias[i-1].estado = estado;
        encontrado = true;
        console.log('encontrado')
      }
    }
 
    if(!encontrado){
      let asistencia = new Asistencia();
      asistencia.estado = estado;
      asistencias.push(asistencia);
    }
  }



}
