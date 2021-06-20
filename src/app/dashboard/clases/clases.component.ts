import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  clases: Clase[] = [];

  constructor(private aulaService: AulaService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarClases();
  }

  cargarClases(): void {
    this.activatedRoute.params
        .subscribe(params => {
          let idAula: string = params['idAula'];
          this.aulaService.getClasesAula(idAula)
        .subscribe(response => this.clases = response);
        })
  }



}
