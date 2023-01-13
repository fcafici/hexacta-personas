import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-ingresar-persona',
  templateUrl: './ingresar-persona.component.html',
  styleUrls: ['./ingresar-persona.component.css']
})
export class IngresarPersonaComponent implements OnInit {

  agregarPersonaRequest: Persona = {
    nombre: '',
    apellido: '',
    dni: 0,
    diaNacimiento: 0,
    mesNacimiento: 0,
    anioNacimiento: 0,
    categoriaEtaria: ''
  };

  fechaNacimientoString: string = '';
  fechaNacimiento: Date = new Date();

constructor(private personaService: PersonasService) {

}

  ngOnInit(): void {
  }

  agregarPersona() {
    this.fechaNacimiento = new Date(this.fechaNacimientoString);
    this.agregarPersonaRequest.diaNacimiento = this.fechaNacimiento.getDate() + 1;  // +1 porque el 0 es el primer dia del mes
    this.agregarPersonaRequest.mesNacimiento = this.fechaNacimiento.getMonth() + 1; // +1 porque el 0 es el primer mes del año
    this.agregarPersonaRequest.anioNacimiento = this.fechaNacimiento.getFullYear();

    this.personaService.agregarPersona(this.agregarPersonaRequest).subscribe({
      next: (persona) => {
        console.log(persona);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
