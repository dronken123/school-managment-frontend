import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { Estudiante } from 'src/app/models/estudiante';
import { Material } from 'src/app/models/material';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';
import { TokenService } from 'src/app/services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.component.html',
  styleUrls: ['./clase-detalle.component.css']
})
export class ClaseDetalleComponent implements OnInit {

  clase: Clase = new Clase();
  listaEstudiantes: Estudiante[] = [];

  idAula: string = '';
  idClase: string = '';
  nombreFile: string = '';

  private archivoPDFSeleccionada: File;


  constructor(private activatedRoute: ActivatedRoute,
              private claseService: ClaseService,
              private aulaService: AulaService,
              private router: Router,
              private tokenService: TokenService) { }

  ngOnInit(): void {
    this.cargarClase();
  }

  regresar(): void {
    if(this.isProfesor){
      this.router.navigate([`dashboard`]);
    }else{
      this.router.navigate([`dashboard/aulas/${this.idAula}/clases`]);
    }
    
  }

  get isProfesor(): boolean{
    return this.tokenService.isProfesor();
  }

  cargarClase(): void {
    this.activatedRoute.params
        .subscribe(params => {
          this.idClase = params['idClase'];
          this.idAula = params['idAula'];
          let idClase1 = +this.idClase;
          this.claseService.getClase(idClase1)
              .subscribe(response => {
                this.clase = response
                this.aulaService.getEstudiantesAula(this.idAula).subscribe(response => this.listaEstudiantes = response);
              });
        })
  }

  seleccionarArchivoPDF(event){
    this.archivoPDFSeleccionada = event.target.files[0];
    console.log(this.archivoPDFSeleccionada);
  }

  subirArchivoPDF(): void {
    this.claseService.subirArchivoPDF(this.archivoPDFSeleccionada, this.idClase, this.nombreFile)
        .subscribe( response => {
          this.clase = response;
          Swal.fire(`El archivo se ha subido correctamente!`, `El archivo ${this.nombreFile} se guardó con éxito`, 'success');
        })
  }

  eliminarArchivo(material: Material): void {


    Swal.fire({
      title: '¿Está seguro de eliminar?',
      text: `Está apunto de eliminar el archivo ${material.nombre}.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#164e85',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.claseService.eliminarArchivoPDF(this.idClase, material.id.toString())
        .subscribe(response => {
          this.clase.materiales = this.clase.materiales.filter(m => m.id !=  material.id);
          Swal.fire(
            'Eliminado!',
            'El material ha sido eliminado con éxito.',
            'success'
          )
        });
        }
  }
  )};

}
