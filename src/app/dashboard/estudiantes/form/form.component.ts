import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { Estudiante } from 'src/app/models/estudiante';
import { Grado } from 'src/app/models/grado';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { GradoService } from 'src/app/services/grado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  estudiante: Estudiante = new Estudiante();
  aulas: Aula[] = [];
  grados: Grado[] = [];
  errores: string[] = [];

  constructor(private estudianteService: EstudianteService,
              private aulaService: AulaService,
              private gradoService: GradoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEstudiante();

    this.gradoService.getGrados().subscribe(response => this.grados = response);

    this.aulaService.getAulas()
        .subscribe(response => {
          this.aulas = response;
        });
  }

  cargarEstudiante(){
    this.activatedRoute.params
        .subscribe(params => {
          let id:number = +params['id'];

          if(id){
            this.estudianteService.getEstudiante(id)
                .subscribe(response => this.estudiante = response);
          }
        })
  }

  crear(){
    this.estudianteService.saveEstudiante(this.estudiante)
        .subscribe(response => {
          this.router.navigate(['/']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.log(this.errores)
        }
        );
  }

  actualizar(){
    this.estudianteService.updateEstudiante(this.estudiante)
        .subscribe(response => {
          this.router.navigate(['/dashboard/estudiantes']);
          Swal.fire(
            'Estudiante actualizado',
            'El estudiante se ha actualizado con éxito',
            'success'
          )
        },
        err => {
          this.errores = err.error.errors as string[];
          console.log(this.errores)
        }
        );
  }

  compararAula(o1: Aula, o2:Aula): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }

  compararGrado(o1: Grado, o2:Grado): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }

}
