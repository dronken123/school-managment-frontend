import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { Curso } from 'src/app/models/curso';
import { Estudiante } from 'src/app/models/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  estudiante: Estudiante = new Estudiante();
  aulas: Aula[] = [];

  errores: string[] = [];

  constructor(private estudianteService: EstudianteService,
              private aulaService: AulaService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEstudiante();

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
          this.router.navigate(['/']);
        },
        err => {
          this.errores = err.error.errors as string[];
          console.log(this.errores)
        }
        );
  }


}
