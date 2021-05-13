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
import { FormComponentClase } from './dashboard/clases/form/form.component';
import { AulasComponent } from './dashboard/aulas/aulas.component';
import { AulaFormComponent } from './dashboard/aulas/aula-form/aula-form.component';

export const routes: Routes = [
  { path: '', component: EstudiantesComponent },
  { path: 'estudiantes/form', component: FormComponent },
  { path: 'estudiantes/form/:id', component: FormComponent },
  { path: 'clases/form', component: FormComponentClase},
  { path: 'clases', component: ClasesComponent},
  { path: 'aulas', component: AulasComponent},
  { path: 'aulas/form', component: AulaFormComponent},
  { path: 'aulas/form/:id', component: AulaFormComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    HeaderComponent,
    FormComponent,
    FormComponentClase,
    DashboardComponent,
    ClasesComponent,
    AulasComponent,
    AulaFormComponent
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
