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

  mostrarClases(){
    this.router.navigate(['clases'], {relativeTo: this.route});
    this.reporte = false;
  }

  mostrarDashboard(){
   this.reporte = true; 
   this.router.navigate(['dashboard']);
  }

  mostrarUsuarios(){
    this.reporte = false; 
    this.router.navigate(['usuarios/page/:page'], {relativeTo: this.route});
   }

   mostrarPedidos(){
    this.reporte = false; 
    this.router.navigate(['pedidos/page/:page'], {relativeTo: this.route});
   }

   mostrarCategorias(){
    this.reporte = false;
    this.router.navigate(['productos/categorias/page/:page'], {relativeTo: this.route});
   }

   crearCategoria(){
    this.reporte = false;
    this.router.navigate(['productos/categorias/form'], {relativeTo: this.route});
   }

   mostrarTipoPago(){
    this.reporte = false;
    this.router.navigate(['pedidos/tipoPago/page/0'], {relativeTo: this.route});
   }

   crearTipoPago(){
    this.reporte = false;
    this.router.navigate(['pedidos/tipoPago/form'], {relativeTo: this.route});
   }

   mostrarZonas(){
     this.reporte = false;
     this.router.navigate(['pedidos/zonas/page/:page'], {relativeTo: this.route});
   }

   crearZona(){
    this.reporte = false;
    this.router.navigate(['pedidos/zonas/form'], {relativeTo: this.route});
  }

  mostrarCremas(){
    this.reporte = false;
    this.router.navigate(['cremas/page/:page'], {relativeTo: this.route});
  }

  crearCrema(){
    this.reporte = false;
    this.router.navigate(['cremas/form'], {relativeTo: this.route});
  }

}
