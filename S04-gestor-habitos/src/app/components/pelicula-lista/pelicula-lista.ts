import { Component, Input } from '@angular/core';
import { Pelicula } from '../../models/pelicula';
import { PeliculaCard } from '../pelicula-card/pelicula-card';

@Component({
  selector: 'app-pelicula-lista',
  imports: [PeliculaCard],
  templateUrl: './pelicula-lista.html',
  styleUrl: './pelicula-lista.css'
})
export class PeliculaLista {

  @Input() peliculas: Pelicula[] = [];

}