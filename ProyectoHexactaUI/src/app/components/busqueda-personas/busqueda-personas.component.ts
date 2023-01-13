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
  nombreAFiltrar: string = '';
  apellidoAFiltrar: string = '';
  queryParam: string = '';
  constructor(private personasService: PersonasService) { }

  ngOnInit(): void {
    this.personasService.getPersonas('').subscribe({
      next: (personas) => {
        this.personas = personas;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }

  filtrarPersona() {
    if (this.nombreAFiltrar && this.apellidoAFiltrar) this.queryParam = '?nombre=' + this.nombreAFiltrar + "&apellido=" + this.apellidoAFiltrar;
    else if (this.nombreAFiltrar) this.queryParam = '?nombre=' + this.nombreAFiltrar;
    else if (this.apellidoAFiltrar) this.queryParam = '?apellido=' + this.apellidoAFiltrar;
    this.personasService.getPersonas(this.queryParam).subscribe({
      next: (personas) => {
        this.personas = personas;
      },
      error: (response) => {
        console.log(response);
      }
    });
  }
}
