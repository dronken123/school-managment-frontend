import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { Estudiante } from 'src/app/models/estudiante';
import { Nota } from 'src/app/models/nota';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  notas: Nota[] = [];

  constructor(private activatedRoute: ActivatedRoute,
              private estudianteService: EstudianteService,
              private claseService: ClaseService,
              private aulaService: AulaService) { }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.activatedRoute.params
        .subscribe(params => {
          let idAula: string = params['idAula'];
          let idClase: string = params['idClase'];

          if(idAula && idClase){
            this.aulaService.getEstudiantesAula(idAula)
                .subscribe(response => {
                  
                  this.estudiantes = response;
                  
                  console.log(this.estudiantes)

                  this.claseService.getClase(+idClase)
                  .subscribe(response => {
                    let clase: Clase;
                    clase = response;
                    
                    
                    this.estudiantes.forEach(e => {
                      
                      e.notas.forEach(n => {
                        if(n.curso.id == clase.curso.id){
                          this.notas.push(n);
                          
                          console.log(this.notas)
                        }else{
                          let nota: Nota = new Nota();
                          nota.curso= clase.curso;
                          nota.estudiante = e;
                          this.claseService.crearNota(nota)
                              .subscribe(response => {
                                this.notas.push(nota);
                              });
                        }
                      })
                    })
                })



                  
                  })

          }
        })
  }

}
