import { Component, OnInit } from '@angular/core';
import { Aula } from 'src/app/models/aula';
import { AulaService } from 'src/app/services/aula.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.css']
})
export class ClasesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
