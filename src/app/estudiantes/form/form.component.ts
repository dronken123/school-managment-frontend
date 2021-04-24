import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Estudiante } from 'src/app/models/estudiante';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  estudiante: Estudiante = new Estudiante();

  constructor(private estudianteService: EstudianteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEstudiante();
  }

  cargarEstudiante(){
    this.activatedRoute.params
        .subscribe(params => {
          let id:number = +params['id'];

          if(id){
            this.estudianteService.getEstudiante(id)
                .subscribe(response => this.estudiante = response);
          }
        })
  }

  crear(){
    this.estudianteService.saveEstudiante(this.estudiante)
        .subscribe(response => {
          this.router.navigate(['/']);
        });
  }

  actualizar(){
    this.estudianteService.updateEstudiante(this.estudiante)
        .subscribe(response => {
          this.router.navigate(['/']);
        })
  }


}
