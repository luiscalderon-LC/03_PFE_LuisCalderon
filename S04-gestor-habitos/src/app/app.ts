import { Component } from '@angular/core';
import { Pelicula } from './models/pelicula';
import { PeliculaFormulario } from './components/pelicula-formulario/pelicula-formulario';
import { PeliculaLista } from './components/pelicula-lista/pelicula-lista';

@Component({
  selector: 'app-root',
  imports: [
    PeliculaFormulario,
    PeliculaLista
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  peliculas: Pelicula[] = [
    {
      titulo: 'Interestelar',
      genero: 'Ciencia ficción',
      anio: 2014,
      calificacion: 9
    },
    {
      titulo: 'Son como niños',
      genero: 'Comedia',
      anio: 2010,
      calificacion: 7
    }
  ];

  agregarPelicula(pelicula: Pelicula) {
    this.peliculas.push(pelicula);
  }

}