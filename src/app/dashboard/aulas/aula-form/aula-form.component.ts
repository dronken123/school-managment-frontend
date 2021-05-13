import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { Estudiante } from 'src/app/models/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { EstudianteService } from 'src/app/services/estudiante.service';

@Component({
  selector: 'app-aula-form',
  templateUrl: './aula-form.component.html',
  styleUrls: ['./aula-form.component.css']
})
export class AulaFormComponent implements OnInit {

  aula: Aula = new Aula();
  estudiantes: Estudiante[] = [];
  errores: string[] = [];
  listaEstudiantes = [];

  constructor(private aulaService: AulaService,
              private estudianteService: EstudianteService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarAula();
    
    this.estudianteService.getEstudiantes()
        .subscribe((response: Estudiante[]) => {
          this.estudiantes = response.filter(e => e.aula === null);
        });
    
  }

  cargarAula(): void{
    this.activatedRoute.params
        .subscribe(params => {
          let id = +params['id'];

          if(id){
            this.aulaService.getAula(id)
                .subscribe(response =>{
                  this.aula = response;
                  this.aula.listaEstudiantes.forEach(e => {
                    this.listaEstudiantes.push([e.nombres, e.apellidoPaterno, e.apellidoMaterno, e.dni, e.id]);
                    
                  })
                });
          }

        })

        
  }

  crear(): void{
    this.aulaService.saveAula(this.aula)
        .subscribe(response => {
          this.router.navigate(['/aulas']);
        })
  }

  actualizar(): void{
    this.aulaService.updateAula(this.aula)
        .subscribe(response => {
          
          this.router.navigate(['/aulas']);
        })
  }

  agregarEstudiante(estudiante: Estudiante): void {
    
    this.estudiantes = this.estudiantes.filter(e => e.id != estudiante.id);
    this.listaEstudiantes.push([estudiante.nombres, estudiante.apellidoPaterno, estudiante.apellidoMaterno, estudiante.dni,estudiante.id]);
    estudiante.aula = this.aula;
    this.estudianteService.updateEstudiante(estudiante)
                          .subscribe();


  }

  quitarEstudiante(estudiante: any): void {
    let estudianteFound: Estudiante = new Estudiante();
    
    this.listaEstudiantes = this.listaEstudiantes.filter(e => e[4] != estudiante[4]);
    this.estudianteService.getEstudiante(estudiante[4]).subscribe(response =>{
      estudianteFound = response;
      estudianteFound.aula = null;
      this.estudianteService.updateEstudiante(estudianteFound).subscribe();
      this.estudiantes.push(estudianteFound);
    });
    
  
    
  
  }
}
