import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NuevoUsuario } from 'src/app/auth/models/nuevo-usuario';
import { Apoderado } from 'src/app/models/apoderado';
import { Estudiante } from 'src/app/models/estudiante';
import { Grado } from 'src/app/models/grado';
import { Matricula } from 'src/app/models/matricula';
import { AuthService } from 'src/app/services/auth.service';
import { GradoService } from 'src/app/services/grado.service';
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
  sexo: string[] = ['MASCULINO', 'FEMENINO'];
  grados: Grado[] = [];

  constructor(private matriculaService: MatriculaService,
              private router: Router,
              private gradoService: GradoService,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.estudiante.apoderado = this.apoderado;
    this.matricula.estudiante = this.estudiante;
    this.gradoService.getGrados().subscribe(response => this.grados = response);
  }

  crear(): void {
    let nuevoUsuario: NuevoUsuario = new NuevoUsuario();
    nuevoUsuario.username = this.estudiante.dni;
    nuevoUsuario.password = this.estudiante.dni;
    nuevoUsuario.roles.push('ROLE_ESTUDIANTE')

    this.authService.nuevo(nuevoUsuario)
        .subscribe(response => {
          this.estudiante.usuario = response.usuario;
          this.matriculaService.saveMatricula(this.matricula).subscribe(response =>{
            this.router.navigate(['/dashboard/estudiantes/page/0'])
            Swal.fire(
              'Matrícula creada',
              'La matrícula se ha creado con éxito',
              'success'
            )
          });
        });


  }

}
