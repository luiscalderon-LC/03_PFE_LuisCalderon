import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LibroService } from './services/libro';
import { Libro } from './models/libro';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {

  libros = signal<Libro[]>([]);
  cargando = signal(true);
  mensaje = signal('');

  nuevoLibro: Libro = {
    title: '',
    author: '',
    year: new Date().getFullYear(),
    image: ''
  };

  constructor(private libroService: LibroService) {}

  ngOnInit(): void {
    this.obtenerLibros();
  }

  // GET
  obtenerLibros(): void {
    this.libroService.listarLibros().subscribe({
      next: (libros) => {
        this.libros.set(libros);
        this.cargando.set(false);
      },
      error: (error) => {
        console.error(error);
        this.cargando.set(false);
      }
    });
  }

  // POST
  registrarLibro(): void {

    if (
      !this.nuevoLibro.title ||
      !this.nuevoLibro.author ||
      !this.nuevoLibro.year ||
      !this.nuevoLibro.image
    ) {
      this.mensaje.set('Completa todos los campos.');
      return;
    }

    this.libroService.registrarLibro(this.nuevoLibro).subscribe({
      next: (libroRegistrado) => {

        // Agregar el nuevo libro al inicio
        this.libros.update(libros => [
          libroRegistrado,
          ...libros
        ]);

        this.mensaje.set('Libro registrado correctamente.');

        // Limpiar formulario
        this.nuevoLibro = {
          title: '',
          author: '',
          year: new Date().getFullYear(),
          image: ''
        };
      },
      error: (error) => {
        console.error(error);
        this.mensaje.set('Error al registrar el libro.');
      }
    });
  }
}