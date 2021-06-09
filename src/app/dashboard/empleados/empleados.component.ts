import { Component, OnInit } from '@angular/core';
import { Empleado } from 'src/app/models/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  listaEmpleados: Empleado[] = [];

  constructor(private empleadoService: EmpleadoService) { }

  ngOnInit(): void {
    this.empleadoService.getEmpleados().subscribe(response => this.listaEmpleados = response);
  }

  eliminar(empleado: Empleado){
    this.empleadoService.deleteEmpleado(empleado.id)
        .subscribe(response => {
          this.listaEmpleados = this.listaEmpleados.filter(e => e !== empleado);
        });
  }

}
