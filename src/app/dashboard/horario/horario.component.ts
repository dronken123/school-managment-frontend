import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { Clase } from 'src/app/models/clase';
import { DiaSemana } from 'src/app/models/dia-semana';
import { Frecuencia } from 'src/app/models/frecuencia';
import { AulaService } from 'src/app/services/aula.service';
import { MatriculaService } from 'src/app/services/matricula-service.service';

@Component({
  selector: 'app-horario',
  templateUrl: './horario.component.html',
  styleUrls: ['./horario.component.css']
})
export class HorarioComponent implements OnInit {

  aula: Aula = new Aula();
  clases: Clase[] = [];
  frecuenciasLunes: Frecuencia[] = [];
  diasSemana: DiaSemana[] = [];
  frecuenciasMartes: Frecuencia[] = [];
  frecuenciasMiercoles: Frecuencia[] = [];
  frecuenciasJueves: Frecuencia[] = [];
  frecuenciasViernes: Frecuencia[] = [];

  constructor(private activatedRoute: ActivatedRoute,
                      private aulaService: AulaService,
                      private matriculaService: MatriculaService,
                      private router: Router) { }

  ngOnInit(): void {
    this.cargarClases();
    
  }

  cargarClases(): void {
    this.activatedRoute.params
        .subscribe(params => {
          let idAula: string = params['idAula'];
          this.aulaService.getAula(+idAula).subscribe(response => this.aula = response);
          this.aulaService.getClasesAula(idAula)
        .subscribe(response => {
          this.clases = response;
          this.matriculaService.getDias().subscribe(response => {
            this.diasSemana = response;
            this.cargarClasexDia();
          } );
          
        });
        })
  }


  cargarClasexDia(): void {
    this.clases.forEach(c => {

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
