import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PeliculaService } from '../pelicula';

@Component({
  selector: 'app-pelicula-lista',
  imports: [FormsModule],
  templateUrl: './pelicula-lista.html',
  styleUrl: './pelicula-lista.css'
})
export class PeliculaLista {

  private peliculaService = inject(PeliculaService);

  peliculas = this.peliculaService.obtenerPeliculas();

  mostrarFormulario = false;

  nuevaPelicula = {
    titulo: '',
    genero: '',
    anio: 2026,
    calificacion: 1
  };

  abrirFormulario() {
    this.mostrarFormulario = true;
  }

  cancelar() {
    this.mostrarFormulario = false;
  }

  agregarPelicula() {

    if (
      this.nuevaPelicula.titulo.trim() === '' ||
      this.nuevaPelicula.genero.trim() === ''
    ) {
      return;
    }

    this.peliculaService.agregarPelicula({
      titulo: this.nuevaPelicula.titulo,
      genero: this.nuevaPelicula.genero,
      anio: this.nuevaPelicula.anio,
      calificacion: this.nuevaPelicula.calificacion
    });

    this.nuevaPelicula = {
      titulo: '',
      genero: '',
      anio: 2026,
      calificacion: 1
    };

    this.mostrarFormulario = false;
  }
}