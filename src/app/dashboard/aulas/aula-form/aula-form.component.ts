import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { Clase } from 'src/app/models/clase';
import { Curso } from 'src/app/models/curso';
import { Estudiante } from 'src/app/models/estudiante';
import { Grado } from 'src/app/models/grado';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';
import { CursoService } from 'src/app/services/curso.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import Swal from 'sweetalert2';

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

  grados: Grado[] = [];
  turnos: string[] = ['MAÑANA', 'TARDE'];
  niveles: string [] = ['PRIMARIA', 'SECUNDARIA'];

  cursos: Curso[] = [];
  claseNueva: Clase = new Clase();

  constructor(private aulaService: AulaService,
              private estudianteService: EstudianteService,
              private claseService: ClaseService,
              private cursoService: CursoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarAula();

    this.aulaService.getGrados()
        .subscribe(response => this.grados = response);

    this.cursoService.getCursos().subscribe(response => this.cursos = response);

    this.estudianteService.getEstudiantes()
        .subscribe((response: Estudiante[]) => {
          this.estudiantes = response.filter((e: Estudiante) => e.aulaEstudiante == null);
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
          this.router.navigate(['/dashboard/aulas']);
          Swal.fire(
            'Aula creada',
            'El aula se ha creado con éxito',
            'success'
          )
        })
  }

  actualizar(): void{
    this.aulaService.updateAula(this.aula)
        .subscribe(response => {
          this.router.navigate(['/dashboard/aulas']);
        })
  }

  agregarClase(claseForm: NgForm): void {

    //se asigna datos a nueva clase por problemas de formulario
    let claseAgregada = new Clase();
    claseAgregada.id = this.claseNueva.id;
    claseAgregada.nombre = this.claseNueva.nombre;
    claseAgregada.curso = this.claseNueva.curso;
    claseAgregada.aula = this.aula;
    
    //insertamos la clase que se asignó los datos
    this.claseService.saveClase(claseAgregada).subscribe(response => {
      this.aula.clasesAula.push(claseAgregada);

      //Se llama nuevamente al aula porque al crear la clase, el ID no se genera hasta recargar la página
      this.aulaService.getAula(this.aula.id).subscribe(response => this.aula = response);

      //limpiamos el fomulario
      claseForm.controls['nombreClase'].setValue('');
      claseForm.controls['cursoClase'].setValue(undefined);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Clase creada con éxito',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  quitarClase(clase: Clase): void {

    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: `Está apunto de eliminar la clase ${clase.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        clase.aula = null;
        this.claseService.updateClase(clase).subscribe(response => {
          this.claseService.deleteClase(clase.id).subscribe(response => {
            this.aula.clasesAula = this.aula.clasesAula.filter(c => c != clase);
            Swal.fire(
              'Eliminado!',
              'La clase se eliminó con éxito.',
              'success'
            )
          });
        })

      }
    })

    
  }

  agregarEstudiante(estudiante: Estudiante): void {
    
    this.estudiantes = this.estudiantes.filter(e => e.id != estudiante.id);
    //Error de bucle infinito resuelto
    this.listaEstudiantes.push([estudiante.nombres, estudiante.apellidoPaterno, estudiante.apellidoMaterno, estudiante.dni,estudiante.id]);
    estudiante.aulaEstudiante = this.aula;
    
    this.estudianteService.updateEstudiante(estudiante)
                          .subscribe();
  }

  quitarEstudiante(estudiante: any): void {
    let estudianteFound: Estudiante = new Estudiante();
    
    //Error de bucle infinito resuelto
    this.listaEstudiantes = this.listaEstudiantes.filter(e => e[4] != estudiante[4]);
    this.estudianteService.getEstudiante(estudiante[4]).subscribe((response) =>{
      
      estudianteFound = response;
      estudianteFound.aulaEstudiante = null;
      this.estudianteService.updateEstudiante(estudianteFound).subscribe();
      this.estudiantes.push(estudianteFound);
    });
  
  }

  
  compararGrado(o1: Grado, o2:Grado): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }
}
