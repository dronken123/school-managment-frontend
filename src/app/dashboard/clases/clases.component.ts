import { Component, OnInit } from '@angular/core';
import { Aula } from 'src/app/models/aula';
import { Clase } from 'src/app/models/clase';
import { AulaService } from 'src/app/services/aula.service';
import { ClaseService } from 'src/app/services/clase.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  clases: Clase[] = [];

  constructor(private claseService: ClaseService) { }

  ngOnInit(): void {
    this.claseService.getClases()
        .subscribe(response => this.clases = response);
  }



}
