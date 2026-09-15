import { Component } from '@angular/core';
import { PeliculaLista } from './pelicula-lista/pelicula-lista';

@Component({
  selector: 'app-root',
  imports: [PeliculaLista],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}