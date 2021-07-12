import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { Estudiante } from 'src/app/models/estudiante';
import { Nota } from 'src/app/models/nota';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { MatriculaService } from 'src/app/services/matricula-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-notas',
  templateUrl: './notas.component.html',
  styleUrls: ['./notas.component.css']
})
export class NotasComponent implements OnInit {

  estudiantes: Estudiante[] = [];
  notas: Nota[] = [];
  
  idAula: string;

  form = this.fb.group({
    lessons: this.fb.array([])
  });

  constructor(private activatedRoute: ActivatedRoute,
              private estudianteService: EstudianteService,
              private claseService: ClaseService,
              private aulaService: AulaService,
              private router: Router,
              private matriculaService: MatriculaService,
              private fb: FormBuilder) { }

  ngOnInit(): void {


    this.activatedRoute.params
        .subscribe(params => {
          this.idAula = params['idAula'];
          let idClase: string = params['idClase'];

          if(this.idAula && idClase){

            this.claseService.getClase(+idClase)
                .subscribe(clase => {
                  this.aulaService.getEstudiantesAula(this.idAula)
                      .subscribe(response => {
                        let notasAux: Nota[] = [];
                        this.estudiantes = response;

                        this.estudiantes.forEach(e => {

                          if(e.notas.length == 0 || e.notas.find(n => n.curso.id == clase.curso.id) == undefined){
                            let nota: Nota = new Nota();
                            nota.curso = clase.curso;
                            nota.nota_bim1 = 0;
                            nota.nota_bim2 = 0;
                            nota.nota_bim3 = 0;
                            nota.nota_bim4 = 0;
                            nota.estudiante = e;
                            notasAux.push(nota);
                          }

                        })

                        if(notasAux.length > 0){
                          this.matriculaService.actualizarNotas(notasAux)
                          .subscribe(response => {
                            this.matriculaService.getNotas(clase.curso.id.toString(), this.idAula)
                            .subscribe(response => {
                              this.notas = response;
                              this.notas.forEach( nota => {
                                this.addLesson(nota);
                              });
                            })
                          })
                        }else{
                          this.matriculaService.getNotas(clase.curso.id.toString(), this.idAula)
                          .subscribe(response => {
                            this.notas = response;
                            this.notas.forEach( nota => {
                              this.addLesson(nota);
                            });
                          })  
                        }

                      });
  
                })


          }
        })

  }

  get lessons() {
    return this.form.controls["lessons"] as FormArray;
  }

  enviar(values){
    this.notas = [];
    values.lessons.forEach( v => {
      let notaActualizar: Nota = new Nota();
      notaActualizar.id = v.idNota;
      notaActualizar.nota_bim1 = v.bimestre1;
      notaActualizar.nota_bim2 = v.bimestre2;
      notaActualizar.nota_bim3 = v.bimestre3;
      notaActualizar.nota_bim4 = v.bimestre4;  
      notaActualizar.estudiante = v.estudiante;
      notaActualizar.curso = v.curso;
      this.notas.push(notaActualizar);
    })
    
    this.matriculaService.actualizarNotas(this.notas)
        .subscribe(response => {
          Swal.fire('Notas guardadas', 'Las notas se guardaron con éxito.','success');
          this.router.navigate([`dashboard/aulas/${this.idAula}/clases`]);
        })
  }

  regresar(): void {
 
      this.router.navigate([`dashboard/aulas/${this.idAula}/clases`]);
    
    
  }

  addLesson(nota: Nota){
 
      const lessonForm = this.fb.group({
        idNota: [nota.id],
        bimestre1: [nota.nota_bim1],
        bimestre2: [nota.nota_bim2],
        bimestre3: [nota.nota_bim3],
        bimestre4: [nota.nota_bim4],
        promedioFinal: [{value: nota.promedio_final, disabled: true}],
        estudiante: [nota.estudiante],
        curso: [nota.curso],
        nombreEstudiante: [{value:nota.estudiante.nombres+' '+nota.estudiante.apellidoPaterno, disabled: true}]
      });

    this.lessons.push(lessonForm);
    

  }

 
}
