import { Component } from '@angular/core';
import { Personajes } from './components/personajes/personajes';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Personajes],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}