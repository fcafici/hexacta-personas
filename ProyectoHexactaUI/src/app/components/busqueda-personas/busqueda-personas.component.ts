import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-busqueda-personas',
  templateUrl: './busqueda-personas.component.html',
  styleUrls: ['./busqueda-personas.component.css']
})
export class BusquedaPersonasComponent implements OnInit {

  personas: Persona[] = []
  constructor(private personasService: PersonasService) { }

  ngOnInit(): void {
    this.personasService.getPersonas().subscribe({
      next: (personas) => {
        this.personas = personas;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
