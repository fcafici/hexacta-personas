import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/persona.model';

@Component({
  selector: 'app-busqueda-personas',
  templateUrl: './busqueda-personas.component.html',
  styleUrls: ['./busqueda-personas.component.css']
})
export class BusquedaPersonasComponent implements OnInit {

  personas: Persona[] = [
    { // borrar esta persona, es para ver que la tabla funcione
      nombre: 'Juan',
      apellido: 'Perez',
      dni: 12345678,
      fechaNacimiento: new Date('1990-01-01'),
      categoriaEtaria: 'Adulto'
    }
  ];
  constructor() { }

  ngOnInit(): void {
    // acá se tienen que pedir los empleados al modelo
    this.personas.push()
  }

}
