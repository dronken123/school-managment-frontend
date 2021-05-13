import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { Clase } from 'src/app/models/clase';
import { Curso } from 'src/app/models/curso';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';
import { CursoService } from 'src/app/services/curso.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponentClase implements OnInit {

  clase: Clase = new Clase();
  cursos: Curso[] = [];
  aulas: Aula[] = [];

  constructor(private aulaService: AulaService, private cursoService: CursoService, private claseService: ClaseService, private router: Router) { }

  ngOnInit(): void {
    this.aulaService.getAulas()
        .subscribe(response => this.aulas = response);

    this.cursoService.getCursos()
        .subscribe(response => {
          this.cursos = response
          console.log(this.cursos);
        });

        
    
  }

  crear(): void{
    this.claseService.saveClase(this.clase)
        .subscribe(response => {
          this.router.navigate(['/clases']);
        });
  }

  actualizar(): void{

  }

}
