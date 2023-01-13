import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaPersonasComponent } from './components/busqueda-personas/busqueda-personas.component';
import { IngresarPersonaComponent } from './components/ingresar-persona/ingresar-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    BusquedaPersonasComponent,
    IngresarPersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
