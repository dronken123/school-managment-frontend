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

export const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'estudiantes', component: EstudiantesComponent },
    { path: 'estudiantes/form', component: FormComponent },
    { path: 'estudiantes/form/:id', component: FormComponent },
    { path: 'clases', component: ClasesComponent},
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
    EmpleadoFormComponent
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
