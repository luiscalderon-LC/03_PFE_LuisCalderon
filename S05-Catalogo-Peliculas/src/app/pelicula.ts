import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PeliculaService {

  private peliculas = [
    {
      titulo: 'Interstellar',
      genero: 'Ciencia ficción',
      anio: 2014,
      calificacion: 9
    },
    {
      titulo: 'Avengers: Endgame',
      genero: 'Acción',
      anio: 2019,
      calificacion: 8
    },
    {
      titulo: 'Coco',
      genero: 'Animación',
      anio: 2017,
      calificacion: 9
    },
    {
      titulo: 'Titanic',
      genero: 'Romance',
      anio: 1997,
      calificacion: 8
    },
    {
      titulo: 'The Batman',
      genero: 'Acción',
      anio: 2022,
      calificacion: 7
    }
  ];

  obtenerPeliculas() {
    return this.peliculas;
  }

  agregarPelicula(pelicula: any) {
    this.peliculas.push(pelicula);
  }
}