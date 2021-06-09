import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  reporte: boolean = true;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  
  
  clear(): void {
  }

  mostrarEstudiantes(){
    this.router.navigate(['estudiantes'], {relativeTo: this.route});
    this.reporte = false;
  }

  mostrarAulas(){
    this.router.navigate(['aulas'], {relativeTo: this.route})
    this.reporte = false;
  }

  mostrarGrados(){
    this.router.navigate(['grados'], {relativeTo: this.route});
    this.reporte = false;
  }
  
  mostrarCursos(){
    this.router.navigate(['cursos'], {relativeTo: this.route});
    this.reporte = false;
  }

  mostrarEmpleados(){
    this.router.navigate(['empleados'], {relativeTo: this.route});
    this.reporte = false;
  }

  mostrarDashboard(){
   this.reporte = true; 
   this.router.navigate(['dashboard']);
  }

  

}
