import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EstudiantesComponent } from './dashboard/estudiantes/estudiantes.component';
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './dashboard/estudiantes/form/form.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ClasesComponent } from './dashboard/clases/clases.component';
import { AulasComponent } from './dashboard/aulas/aulas.component';
import { AulaFormComponent } from './dashboard/aulas/aula-form/aula-form.component';
import { GradosComponent } from './dashboard/grados/grados.component';
import { MatriculasComponent } from './dashboard/matriculas/matriculas.component';
import { MatriculaFormComponent } from './dashboard/matriculas/matricula-form/matricula-form.component';
import { CursosComponent } from './dashboard/cursos/cursos.component';
import { LineChartComponent } from './dashboard/charts/line-chart/line-chart.component';
import { PieChartComponent } from './dashboard/charts/pie-chart/pie-chart.component';
import { EmpleadosComponent } from './dashboard/empleados/empleados.component';
import { EmpleadoFormComponent } from './dashboard/empleados/empleado-form/empleado-form.component';
import { ClaseDetalleComponent } from './dashboard/clases/clase-detalle/clase-detalle.component';
import { LoginComponent } from './auth/login.component';
import { PaginatorComponent } from './shared/paginator/paginator.component';
import { AsistenciasComponent } from './dashboard/clases/asistencias/asistencias.component';
import { HorarioComponent } from './dashboard/horario/horario.component';
import { NotasComponent } from './dashboard/notas/notas.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    // { path: 'estudiantes/page/:page', component: EstudiantesComponent },
    { path: 'estudiantes/page/:page', component: EstudiantesComponent },
    { path: 'estudiantes/form', component: FormComponent },
    { path: 'estudiantes/form/:id', component: FormComponent },
    { path: 'aulas/:idAula/clases', component: ClasesComponent},
    { path: 'aulas/:idAula/clases/horario', component: HorarioComponent},
    { path: 'aulas/:idAula/clases/:idClase', component: ClaseDetalleComponent},
    { path: 'aulas/:idAula/clases/:idClase/asistencias', component: AsistenciasComponent},
    { path: 'aulas', component: AulasComponent},
    { path: 'aulas/form', component: AulaFormComponent},
    { path: 'aulas/form/:id', component: AulaFormComponent},
    { path: 'matriculas/form', component: MatriculaFormComponent },
    { path: 'grados', component: GradosComponent },
    { path: 'cursos', component: CursosComponent },
    { path: 'empleados', component: EmpleadosComponent },
    { path: 'empleados/form', component: EmpleadoFormComponent },
    { path: 'empleados/form/:id', component: EmpleadoFormComponent },
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    HeaderComponent,
    FormComponent,
    DashboardComponent,
    ClasesComponent,
    AulasComponent,
    AulaFormComponent,
    GradosComponent,
    MatriculasComponent,
    MatriculaFormComponent,
    CursosComponent,
    LineChartComponent,
    PieChartComponent,
    EmpleadosComponent,
    EmpleadoFormComponent,
    ClaseDetalleComponent,
    LoginComponent,
    PaginatorComponent,
    AsistenciasComponent,
    HorarioComponent,
    NotasComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
