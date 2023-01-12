import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BusquedaPersonasComponent } from './components/busqueda-personas/busqueda-personas.component';
import { IngresarPersonaComponent } from './components/ingresar-persona/ingresar-persona.component';

const routes: Routes = [
  {
    path: '',
    component: BusquedaPersonasComponent
  },
  {
    path: 'personas',
    component: BusquedaPersonasComponent
  },
  {
    path: 'ingreso',
    component: IngresarPersonaComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
