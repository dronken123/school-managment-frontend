import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Aula } from 'src/app/models/aula';
import { Clase } from 'src/app/models/clase';
import { Curso } from 'src/app/models/curso';
import { DiaSemana } from 'src/app/models/dia-semana';
import { Empleado } from 'src/app/models/empleado';
import { Estudiante } from 'src/app/models/estudiante';
import { Frecuencia } from 'src/app/models/frecuencia';
import { Grado } from 'src/app/models/grado';
import { Nivel } from 'src/app/models/nivel';
import { Turno } from 'src/app/models/turno';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';
import { CursoService } from 'src/app/services/curso.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EstudianteService } from 'src/app/services/estudiante.service';
import { GradoService } from 'src/app/services/grado.service';
import { MatriculaService } from 'src/app/services/matricula-service.service';
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
  aulaEstudiantes: Estudiante[] = [];

  empleados: Empleado[] = [];
  grados: Grado[] = [];
  turnos: Turno[] = [];
  niveles: Nivel[] = [];

  cursos: Curso[] = [];
  claseNueva: Clase = new Clase();
  clasesAula: Clase[] = [];
  frecuencias: Frecuencia[] = [];

  dias: DiaSemana[] = [];
  inicio_horas: string[] = ['7:00 AM','8:00 AM','9:00 AM','10:00 AM','11:00 AM','12:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM','5:00 PM','6:00 PM', '7:00 PM'];

  constructor(private aulaService: AulaService,
              private estudianteService: EstudianteService,
              private claseService: ClaseService,
              private cursoService: CursoService,
              private matriculaService: MatriculaService,
              private router: Router,
              private gradoService: GradoService,
              private empleadoService: EmpleadoService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarAula();

    this.empleadoService.getEmpleados().subscribe(response => this.empleados = response);

    this.gradoService.getGrados()
        .subscribe(response => this.grados = response);

    this.cursoService.getCursos().subscribe(response => this.cursos = response);

    this.matriculaService.getNiveles().subscribe(response => this.niveles = response);

    this.matriculaService.getTurnos().subscribe(response => this.turnos = response); 

    this.matriculaService.getDias().subscribe(response => this.dias = response);


  }

  cargarAula(): void{
    this.activatedRoute.params
        .subscribe(params => {
          let id = +params['id'];

          if(id){
 
            this.aulaService.getAula(id)
                .subscribe(response =>{
                  this.aula = response; 
                  console.log(this.aula)
                  if(this.frecuencias.length == 0){
                    let frecuencia: Frecuencia = new Frecuencia();
                    this.frecuencias.push(frecuencia);
                  }

                  this.aulaService.getClasesAula(id.toString()).subscribe(response => {
                    this.clasesAula = response;
                  });
                  this.aulaService.getEstudiantesAula(id.toString()).subscribe(response => {
                    this.aulaEstudiantes = response;
                    this.aula.cantidadEstudiante = response.length;
                  })
                  this.estudianteService.getEstudiantes()
                  .subscribe((response: Estudiante[]) => {
      
                    this.estudiantes = response.filter((e: Estudiante) => e.aulaEstudiante == null && e.grado.id == this.aula.gradoAula.id);
                  });
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
            'El aula se ha creado con ??xito',
            'success'
          )
        })
  }

  actualizar(): void{
    this.aulaService.updateAula(this.aula)
        .subscribe(response => {
          this.router.navigate(['/dashboard/aulas']);

          Swal.fire(
            'Actualizado!',
            'El aula se actualiz?? con ??xito.',
            'success'
          )
        })
  }

  agregarClase(claseForm: NgForm): void {
    
    //se asigna datos a nueva clase por problemas de formulario
    let claseAgregada = new Clase();
    claseAgregada.id = this.claseNueva.id;
    claseAgregada.curso = this.claseNueva.curso;
    claseAgregada.aula = this.aula;
    claseAgregada.empleado = this.claseNueva.empleado;
    claseAgregada.frecuencias = this.frecuencias;
    //insertamos la clase que se asign?? los datos
    this.claseService.saveClase(claseAgregada).subscribe(clase => {
      this.clasesAula.push(claseAgregada);

      //Se llama nuevamente a las clases del aula porque al crear la clase, el ID no se genera hasta recargar la p??gina
      this.aulaService.getClasesAula(this.aula.id.toString()).subscribe(response => this.clasesAula = response);
      
      //limpiamos el fomulario
      let frecuencia: Frecuencia = new Frecuencia();
      this.frecuencias = [];
      this.frecuencias.push(frecuencia);
      this.claseNueva.empleado = undefined;
      this.claseNueva.curso = undefined;
      // claseForm.controls['cursoClase'].setValue(undefined);
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Clase creada con ??xito',
        showConfirmButton: false,
        timer: 1000
      })
    })
  }

  quitarClase(clase: Clase): void {

    Swal.fire({
      title: '??Est?? seguro de eliminar?',
      text: `Est?? apunto de eliminar la clase ${clase.curso.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#164e85',
      cancelButtonColor: '#d33',
      confirmButtonText: 'S??, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        
        clase.aula = null;
        clase.empleado = null;
        this.claseService.updateClase(clase).subscribe(response => {
          this.claseService.deleteClase(clase.id).subscribe(response => {
            this.clasesAula = this.clasesAula.filter(c => c != clase);
            Swal.fire(
              'Eliminado!',
              'La clase se elimin?? con ??xito.',
              'success'
            )
          });
        })

      }
    })

    
  }

  agregarEstudiante(estudiante: Estudiante): void {
    
    if(this.aula.cantidadEstudiante < this.aula.capacidad){
      this.aula.cantidadEstudiante++;
      estudiante.aulaEstudiante = this.aula;
    
      this.estudianteService.updateEstudiante(estudiante)
                            .subscribe(response => {
                              this.estudiantes = this.estudiantes.filter(e => e.id != estudiante.id);
                              this.aulaEstudiantes.push(estudiante);
                            });
    }else{
      Swal.fire('Upss!',`Capacidad m??xima: ${this.aula.capacidad} estudiantes.`,'warning')
    }

  }

  quitarEstudiante(estudiante: Estudiante): void {

    this.aulaEstudiantes = this.aulaEstudiantes.filter(e => e.id != estudiante.id)
    estudiante.aulaEstudiante = null;
    this.estudianteService.updateEstudiante(estudiante).subscribe(response => {
      this.aula.cantidadEstudiante--;
      this.estudiantes.push(estudiante);
    })
  }

  agregarFrecuencia(): void {
    let frecuencia: Frecuencia = new Frecuencia();
    this.frecuencias.push(frecuencia);
  }

  quitarFrecuencia(frecuencia: Frecuencia): void {
    const index = this.frecuencias.indexOf(frecuencia);
    if(index > -1){
      this.frecuencias.splice(index, 1);
    }
  }

  
  compararGrado(o1: Grado, o2:Grado): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }

  compararNivel(o1: Nivel, o2:Nivel): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }

  compararTurno(o1: Turno, o2:Turno): boolean{
    if(o1 === undefined && o2 === undefined) return true;
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false: o1.id == o2.id;
  }
}
