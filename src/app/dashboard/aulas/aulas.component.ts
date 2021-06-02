import { Component, OnInit } from '@angular/core';
import { Aula } from 'src/app/models/aula';
import { Estudiante } from 'src/app/models/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-aulas',
  templateUrl: './aulas.component.html',
  styleUrls: ['./aulas.component.css']
})
export class AulasComponent implements OnInit {


  aulas: Aula[] = [];
  estudiantes: Estudiante[] = [];

  constructor(private aulaService: AulaService, private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    
    this.aulaService.getAulas()
        .subscribe(response => this.aulas = response);

    this.estudianteService.getEstudiantes()
        .subscribe(response => {
          this.estudiantes = response.filter((e: Estudiante) => e.aulaEstudiante == null);
        });
  }

}
