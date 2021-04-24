import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { EstudiantesComponent } from './estudiantes/estudiantes.component';
import { HeaderComponent } from './shared/header/header.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './estudiantes/form/form.component';

export const routes: Routes = [
  { path: '', component: EstudiantesComponent },
  { path: 'estudiantes/form', component: FormComponent },
  { path: 'estudiantes/form/:id', component: FormComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    EstudiantesComponent,
    HeaderComponent,
    FormComponent
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
