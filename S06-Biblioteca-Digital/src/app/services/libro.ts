import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Libro } from '../models/libro';

@Injectable({
  providedIn: 'root'
})
export class LibroService {

  // GET: libros reales
  private apiLibros =
    'https://openlibrary.org/search.json?q=don+quijote';

  // POST: endpoint de prueba
  private apiRegistro =
    'https://jsonplaceholder.typicode.com/posts';

  constructor(private http: HttpClient) {}

  // GET - Listar libros reales
  listarLibros(): Observable<Libro[]> {
    return this.http.get<any>(this.apiLibros).pipe(
      map(respuesta =>
        respuesta.docs.slice(0, 12).map((libro: any) => ({
          title: libro.title,
          author: libro.author_name?.[0] || 'Autor desconocido',
          year: libro.first_publish_year || 0,
          image: libro.cover_i
            ? `https://covers.openlibrary.org/b/id/${libro.cover_i}-M.jpg`
            : 'https://placehold.co/300x400?text=Sin+Portada'
        }))
      )
    );
  }

  // POST - Registrar libro
  registrarLibro(libro: Libro): Observable<Libro> {
    return this.http.post<any>(this.apiRegistro, libro).pipe(
      map(respuesta => ({
        id: respuesta.id,
        title: libro.title,
        author: libro.author,
        year: libro.year,
        image: libro.image
      }))
    );
  }
}