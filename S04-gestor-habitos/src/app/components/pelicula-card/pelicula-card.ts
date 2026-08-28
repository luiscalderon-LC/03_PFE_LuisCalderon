import { Component, Input } from '@angular/core';
import { Pelicula } from '../../models/pelicula';

@Component({
  selector: 'app-pelicula-card',
  imports: [],
  templateUrl: './pelicula-card.html',
  styleUrl: './pelicula-card.css'
})
export class PeliculaCard {

  @Input() pelicula!: Pelicula;

}