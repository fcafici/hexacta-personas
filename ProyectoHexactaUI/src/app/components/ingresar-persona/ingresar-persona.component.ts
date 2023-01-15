import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Persona } from 'src/app/models/persona.model';
import { PersonasService } from 'src/app/services/personas.service';

@Component({
  selector: 'app-ingresar-persona',
  templateUrl: './ingresar-persona.component.html',
  styleUrls: ['./ingresar-persona.component.css']
})
export class IngresarPersonaComponent implements OnInit {
/*
  formIngreso: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
      dni: new FormControl('', [Validators.required, Validators.maxLength(8), Validators.min(1)]),
      fechaNacimiento: new FormControl('', [Validators.required])
  });
*/
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



  validaciones: Map<string, boolean> = new Map<string, boolean>([
    ['nombre', false],
    ['apellido', false],
    ['dni', false],
    ['fechaNacimiento', false]
  ]);

constructor(private personaService: PersonasService, private router: Router) {

}

validarLongitud(atributo : string) : boolean {
  return atributo.length >= 3 && atributo.length <= 50;
} 

validarDni(dni: number) : boolean {
  return dni > 0 && dni <= 99999999;
}

validarFechaPasada(fechaString : string) : boolean {
  console.log("entre a validar fecha pasada");
  var fecha: Date = new Date(fechaString);
  return fecha < new Date();  // new Date() es la fecha actual
}

/*
  initFormPersona(): void {
    this.formIngreso = new FormGroup({
      
    });
  }
*/
  ngOnInit(): void {
    //this.initFormPersona();
  }

  generarFechaNacimiento(persona: Persona, fechaNacimientoString: string): void {
    var fecha: Date = new Date(fechaNacimientoString);
    persona.diaNacimiento = fecha.getDate() + 1;  // +1 porque el 0 es el primer dia del mes
    persona.mesNacimiento = fecha.getMonth() + 1; // +1 porque el 0 es el primer mes del año
    persona.anioNacimiento = fecha.getFullYear();
  }

  validRequest() : boolean {
    return Array.from(this.validaciones.values()).every(v => v == true);
    // de esta forma, pueden agregarse validaciones al diccionario y este método sigue funcionando.
  }

  agregarPersona() {
    this.generarFechaNacimiento(this.agregarPersonaRequest, this.fechaNacimientoString)
    
    if (!this.validRequest()) return;

    this.personaService.agregarPersona(this.agregarPersonaRequest).subscribe({
      next: (persona) => {
        console.log(persona);
        this.router.navigate(['/personas']);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

}
