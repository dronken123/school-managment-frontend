import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { DiaSemana } from 'src/app/models/dia-semana';
import { Frecuencia } from 'src/app/models/frecuencia';
import { AulaService } from 'src/app/services/aula.service';
import { MatriculaService } from 'src/app/services/matricula-service.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  clases: Clase[] = [];
  diasSemana: DiaSemana[] = [];

  frecuenciasLunes: Frecuencia[] = [];
  frecuenciasMartes: Frecuencia[] = [];
  frecuenciasMiercoles: Frecuencia[] = [];
  frecuenciasJueves: Frecuencia[] = [];
  frecuenciasViernes: Frecuencia[] = [];

  constructor(private aulaService: AulaService,
              private activatedRoute: ActivatedRoute,
              private matriculaService: MatriculaService) { }

  ngOnInit(): void {
    this.cargarClases();
    this.matriculaService.getDias().subscribe(response => this.diasSemana = response);
  }

  cargarClases(): void {
    this.activatedRoute.params
        .subscribe(params => {
          let idAula: string = params['idAula'];
          this.aulaService.getClasesAula(idAula)
        .subscribe(response => {
          this.clases = response;
          this.cargarClasexDia();
        });
        })
  }

  cargarClasexDia(): void {
    this.clases.forEach(c => {
      
      // frecuenciasLunes = c.frecuencias.filter(f => {
      //   if(f.dia.id == this.diasSemana[0].id){
      //     return f;
      //   }
        
      // })
      c.frecuencias.forEach(f => {
        if(f.dia.id === this.diasSemana[0].id){
          this.frecuenciasLunes.push(f);
        }
        if(f.dia.id === this.diasSemana[1].id){
          this.frecuenciasMartes.push(f);
        }
        if(f.dia.id === this.diasSemana[2].id){
          this.frecuenciasMiercoles.push(f);
        }
        if(f.dia.id === this.diasSemana[3].id){
          this.frecuenciasJueves.push(f);
        }
        if(f.dia.id === this.diasSemana[4].id){
          this.frecuenciasViernes.push(f);
        }
      })
    })

    console.log(this.frecuenciasLunes)
    console.log(this.frecuenciasMartes)
    console.log(this.frecuenciasMiercoles)
    console.log(this.frecuenciasJueves)
    console.log(this.frecuenciasViernes)
  }




}
