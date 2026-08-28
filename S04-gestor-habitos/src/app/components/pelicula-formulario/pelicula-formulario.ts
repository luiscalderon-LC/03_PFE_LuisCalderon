import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-pelicula-formulario',
  imports: [FormsModule],
  templateUrl: './pelicula-formulario.html',
  styleUrl: './pelicula-formulario.css'
})
export class PeliculaFormulario {

  titulo: string = '';
  genero: string = '';
  anio: number = 2026;
  calificacion: number = 1;

  @Output() peliculaAgregada = new EventEmitter<Pelicula>();

  agregarPelicula() {
    const nuevaPelicula: Pelicula = {
      titulo: this.titulo,
      genero: this.genero,
      anio: this.anio,
      calificacion: this.calificacion
    };

    this.peliculaAgregada.emit(nuevaPelicula);

    this.titulo = '';
    this.genero = '';
    this.anio = 2026;
    this.calificacion = 1;
  }
}