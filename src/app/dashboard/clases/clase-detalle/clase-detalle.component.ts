import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Clase } from 'src/app/models/clase';
import { Estudiante } from 'src/app/models/estudiante';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-clase-detalle',
  templateUrl: './clase-detalle.component.html',
  styleUrls: ['./clase-detalle.component.css']
})
export class ClaseDetalleComponent implements OnInit {

  @Output() parentFunction: EventEmitter<any> = new EventEmitter()

  clase: Clase = new Clase();
  listaEstudiantes: Estudiante[] = [];

  idAula: string = '';
  idClase: string = '';

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
    
    this.parentFunction.emit('ANDER');
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

}
