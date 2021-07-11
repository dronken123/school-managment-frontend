import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Aula } from 'src/app/models/aula';
import { Clase } from 'src/app/models/clase';
import { AulaService } from 'src/app/services/aula.service';
import { MatriculaService } from 'src/app/services/matricula-service.service';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  @Input() events: Observable<any>;

  aulas: Aula[] = [];
  multi: any[];
  view: any[] = [800, 400];

  multiData: any[] = [];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Aulas';
  showYAxisLabel: boolean = true;
  yAxisLabel: string = 'Cantidad de aprobados';
  animations: boolean = true;

  colorScheme = {
    domain: ['#2cd280', '#66b0ff']
  };

  constructor(private aulaService: AulaService, private matriculaService: MatriculaService) {
  }

  onSelect(event) {
    console.log(event);
  }

  ngOnInit(): void {
    this.events.subscribe(grados => {
      this.getDatosChart(grados[0], grados[1]);
    })
  }

  getDatosChart(idCurso: number, idGrado: number): void {
    this.multiData = [];
    this.multi = [];

    this.aulaService.getAulas()
    .subscribe(aulas => {
        
        aulas.forEach((e,i) => {

          if(idGrado == undefined){
            this.aulaService.getClasesAula(e.id.toString())
            .subscribe(clases => {

              if(clases.find(r => r.curso.id == idCurso)){
                let claseEncontrada: Clase = clases.find(r => r.curso.id == idCurso);
                this.matriculaService.getNotas(claseEncontrada.curso.id.toString(), claseEncontrada.aula.id.toString())
                    .subscribe(notas => {
                      let aprobado = 0;
                      notas.forEach(nota => {
                        if(nota.nota_bim1>12){
                          aprobado++;
                        }
                      })
                      this.multiData.push({
                        "name": e.nombre+e.seccion,
                        "series":[
                          {
                            "name": "Aprobados",
                            "value": aprobado
                          },
                          {
                            "name": "Desaprobados",
                            "value": notas.length - aprobado
                          }
                        ]
                      });
                      this.multi = [...this.multiData].sort(this.compare);
                    })

              }
            })
          }

          if(e.gradoAula.id == idGrado){
            this.aulaService.getClasesAula(e.id.toString())
            .subscribe(clases => {

              if(clases.find(r => r.curso.id == idCurso)){
                let claseEncontrada: Clase = clases.find(r => r.curso.id == idCurso);
                console.log(claseEncontrada)
                this.matriculaService.getNotas(claseEncontrada.curso.id.toString(), claseEncontrada.aula.id.toString())
                    .subscribe(notas => {
                      let aprobado = 0;
                      notas.forEach(nota => {
                        if(nota.nota_bim1>12){
                          aprobado++;
                        }
                      })
                      this.multiData.push({
                        "name": e.nombre+e.seccion,
                        "series":[
                          {
                            "name": "Aprobados",
                            "value": aprobado
                          },
                          {
                            "name": "Desaprobados",
                            "value": notas.length - aprobado
                          }
                        ]
                      });
                      this.multi = [...this.multiData].sort(this.compare);
                    })

              }
            })

          }

          


        })
      
    })
  }

  compare( a, b ) {
    if ( a.name < b.name ){
      return -1;
    }
    if ( a.name > b.name ){
      return 1;
    }
    return 0;
  }
  

}
