import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  listaEstudiantes: Estudiante[] = [];

  constructor(private estudianteService: EstudianteService) { }

  ngOnInit(): void {
    this.estudianteService.getEstudiantes()
        .subscribe(response => {
          this.listaEstudiantes = response;
          console.log(this.listaEstudiantes);
        });
  }

  
  eliminar(estudiante: Estudiante){
    this.estudianteService.deleteEstudiante(estudiante.id)
        .subscribe(response => {
          this.listaEstudiantes = this.listaEstudiantes.filter(e => e !== estudiante);
        });
  }

}
