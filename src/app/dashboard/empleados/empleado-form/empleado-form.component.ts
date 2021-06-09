import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.component.html',
  styleUrls: ['./empleado-form.component.css']
})
export class EmpleadoFormComponent implements OnInit {

  empleado: Empleado = new Empleado();

  errores: string[] = [];
  sexo: string[] = ['MASCULINO', 'FEMENINO'];

  constructor(private empleadoService: EmpleadoService, private router: Router) { }

  ngOnInit(): void {
  }

  crear(){
    
    this.empleadoService.saveEmpleado(this.empleado)
        .subscribe(response => {
          this.router.navigate(['/dashboard/empleados']);
          Swal.fire(
            'Matrícula creada',
            'La matrícula se ha creado con éxito',
            'success'
          )
        },
        err => {
          this.errores = err.error.errors as string[];
          console.log(this.errores)
        }
        );
  }

}
