import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Persona } from '../models/persona.model';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  baseApiUrl: string = environment.baseApiUrl;
  constructor(private http : HttpClient) { }

  getPersonas(): Observable<Persona[]> {
    return this.http.get<Persona[]>(this.baseApiUrl + '/api/personas');
  }

  agregarPersona(agregarPersonaRequest: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.baseApiUrl + '/api/personas', 
    agregarPersonaRequest);
  }
}
