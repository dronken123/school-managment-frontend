import { Component, OnInit } from '@angular/core';
import { Estudiante } from '../../models/estudiante';
import { EstudianteService } from '../../services/estudiante.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-estudiantes',
  templateUrl: './estudiantes.component.html',
  styleUrls: ['./estudiantes.component.css']
})
export class EstudiantesComponent implements OnInit {

  listaEstudiantes: Estudiante[] = [];

  paginador: any;

  constructor(private estudianteService: EstudianteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap
    .subscribe(params => {

      let page: number = +params.get('page');

      if(!page) {page = 0}

      this.estudianteService.getEstudiantesPage(page)
          .subscribe(response => {
            this.listaEstudiantes = response.content as Estudiante[];
            this.paginador = response;
          }) ;
    });

    // this.estudianteService.getEstudiantes()
    //     .subscribe(response => {
    //       this.listaEstudiantes = response;
    //       console.log(this.listaEstudiantes)
    //     });
  }

  

  
  eliminar(estudiante: Estudiante){

    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: `Está apunto de eliminar al estudiante ${estudiante.nombres}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#164e85',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log(estudiante.aulaEstudiante)
        if(estudiante.aulaEstudiante === null){
          this.estudianteService.deleteEstudiante(estudiante.id)
          .subscribe(response => {
            this.listaEstudiantes = this.listaEstudiantes.filter(e => e !== estudiante);
          });
                Swal.fire(
                  'Eliminado!',
                  'El Estudiante se eliminó con éxito.',
                  'success'
                )
        }else{

          Swal.fire(
            
            'Ups..!',
            'Estudiante que pertenece a un aula, no se puede eliminar.',
            'error'
          )
          return
        }

      }
    })


  }

}
