import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Personaje {
  id?: string;
  nombre: string;
  especie: string;
  genero: string;
  estado: string;
  imagen: string;
}

@Injectable({
  providedIn: 'root'
})
export class PersonajeService {

  private apiUrl =
    'https://6ab67e8bc4c7bb67b918e38f.mockapi.io/api/v1/personajes';

  constructor(private http: HttpClient) {}

  // GET - Consultar todos los personajes
  obtenerPersonajes(): Observable<Personaje[]> {
    return this.http.get<Personaje[]>(this.apiUrl);
  }

  // POST - Registrar un personaje
  crearPersonaje(personaje: Personaje): Observable<Personaje> {
    return this.http.post<Personaje>(this.apiUrl, personaje);
  }

  // PUT - Actualizar un personaje
  actualizarPersonaje(id: string, personaje: Personaje): Observable<Personaje> {
    return this.http.put<Personaje>(`${this.apiUrl}/${id}`, personaje);
  }

  // DELETE - Eliminar un personaje
  eliminarPersonaje(id: string): Observable<Personaje> {
    return this.http.delete<Personaje>(`${this.apiUrl}/${id}`);
  }
}