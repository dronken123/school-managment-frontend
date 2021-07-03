import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  estudiantes: Estudiante[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private estudianteService: EstudianteService,
              private aulaService: AulaService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.activatedRoute.params
        .subscribe(params => {
          let idAula: string = params['idAula'];
          let idClase: string = params['idClase'];

          if(idAula && idClase){
            this.aulaService.getEstudiantesAula(idAula)
                .subscribe(response => this.estudiantes = response);
          }
        })
  }

}
