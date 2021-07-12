import { DatePipe } from '@angular/common';
import { Component, OnInit, NgModule, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Asistencia } from 'src/app/models/asistencia';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  @Input() events: Observable<any>;
  multiData: any[] = [];

  single: any[];
  view: any[] = [700, 400];

  // options
  gradient: boolean = true;
  showLegend: boolean = true;
  showLabels: boolean = true;
  isDoughnut: boolean = false;
  legendPosition: string = 'below';

  colorScheme = {
    domain: ['#2cd280', '#dc3545', '#ffc107']
  };

  constructor(private estudianteService: EstudianteService, private datePipe: DatePipe) { }
  
  ngOnInit(): void {
    

    this.events.subscribe(fecha => {
      this.multiData = [];
      this.single = [];
      
      this.estudianteService.getEstudiantes()
          .subscribe((estudiantes: Estudiante[]) => {
            let asistenciaCounter: number = 0;
            let tardanzaCounter: number = 0;
            let faltaCounter: number = 0;
            estudiantes.forEach(e => {
              
              let asistencia: Asistencia = e.asistencias.find(a => this.datePipe.transform(a.fecha,'MM/dd/yyyy') == fecha);
              if(asistencia.estado == 'PUNTUAL'){
                asistenciaCounter++;
              }
              if(asistencia.estado == 'TARDANZA'){
                tardanzaCounter++;
              }

              if(asistencia.estado == 'FALTA'){
                faltaCounter++;
              }

              
            });


            this.multiData.push(    {
              "name": "PUNTUAL",
              "value": asistenciaCounter
            },
            {
              "name": "INASISTENCIA",
              "value": faltaCounter
            },
            {
            "name": "TARDANZA",
              "value": tardanzaCounter
            });
            console.log(this.multiData)
            this.single = [...this.multiData]
          })

    })
    
  }
  
  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }

}
