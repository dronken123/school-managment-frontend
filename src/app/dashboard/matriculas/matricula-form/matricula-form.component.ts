import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Apoderado } from 'src/app/models/apoderado';
import { Estudiante } from 'src/app/models/estudiante';
import { Matricula } from 'src/app/models/matricula';
import { MatriculaService } from 'src/app/services/matricula-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-matricula-form',
  templateUrl: './matricula-form.component.html',
  styles: [
  ]
})
export class MatriculaFormComponent implements OnInit {

  estudiante: Estudiante = new Estudiante();
  apoderado: Apoderado = new Apoderado();
  matricula: Matricula = new Matricula();

  constructor(private matriculaService: MatriculaService, private router: Router) { }

  ngOnInit(): void {
    this.estudiante.apoderado = this.apoderado;
    this.matricula.estudiante = this.estudiante;
  }

  crear(): void {
    this.matriculaService.saveMatricula(this.matricula).subscribe(response =>{
      this.router.navigate(['/dashboard/estudiantes'])
      Swal.fire(
        'Matrícula creada',
        'La matrícula se ha creado con éxito',
        'success'
      )
    });
  }

}
