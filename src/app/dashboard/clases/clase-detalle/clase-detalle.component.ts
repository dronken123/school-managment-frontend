import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { Estudiante } from 'src/app/models/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.component.html',
  styleUrls: ['./clase-detalle.component.css']
})
export class ClaseDetalleComponent implements OnInit {

  clase: Clase = new Clase();
  listaEstudiantes: Estudiante[] = [];

  constructor(private activatedRoute: ActivatedRoute, private claseService: ClaseService, private aulaService: AulaService) { }

  ngOnInit(): void {
    this.cargarClase();
  }

  cargarClase(): void {
    this.activatedRoute.params
        .subscribe(params => {
          let idClase = +params['idClase'];
          let idAula: string = params['idAula'];
          this.claseService.getClase(idClase)
              .subscribe(response => {
                this.clase = response
                this.aulaService.getEstudiantesAula(idAula).subscribe(response => this.listaEstudiantes = response);
              });
        })
  }

}
