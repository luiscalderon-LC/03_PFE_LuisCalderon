import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Personaje, PersonajeService } from '../../services/personaje';

@Component({
  selector: 'app-personajes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './personajes.html',
  styleUrl: './personajes.css'
})
export class Personajes implements OnInit {

  personajes: Personaje[] = [];

  personaje: Personaje = {
    nombre: '',
    especie: '',
    genero: '',
    estado: '',
    imagen: ''
  };

  editando = false;
  idEditando = '';

  constructor(private personajeService: PersonajeService) {}

  ngOnInit(): void {
    this.listarPersonajes();
  }

  // GET
  listarPersonajes(): void {
    this.personajeService.obtenerPersonajes().subscribe({
      next: (datos) => {
        this.personajes = datos;
      },
      error: (error) => {
        console.error('Error al obtener personajes:', error);
      }
    });
  }

  // POST o PUT
  guardarPersonaje(): void {

    if (
      !this.personaje.nombre ||
      !this.personaje.especie ||
      !this.personaje.genero ||
      !this.personaje.estado
    ) {
      alert('Complete los campos obligatorios.');
      return;
    }

    if (this.editando) {

      this.personajeService
        .actualizarPersonaje(this.idEditando, this.personaje)
        .subscribe({
          next: () => {
            alert('Personaje actualizado correctamente.');
            this.listarPersonajes();
            this.limpiarFormulario();
          },
          error: (error) => {
            console.error('Error al actualizar:', error);
          }
        });

    } else {

      this.personajeService
        .crearPersonaje(this.personaje)
        .subscribe({
          next: () => {
            alert('Personaje registrado correctamente.');
            this.listarPersonajes();
            this.limpiarFormulario();
          },
          error: (error) => {
            console.error('Error al registrar:', error);
          }
        });
    }
  }

  // Preparar formulario para PUT
  editarPersonaje(personaje: Personaje): void {

    this.personaje = {
      nombre: personaje.nombre,
      especie: personaje.especie,
      genero: personaje.genero,
      estado: personaje.estado,
      imagen: personaje.imagen
    };

    this.idEditando = personaje.id!;
    this.editando = true;
  }

  // DELETE
  eliminarPersonaje(id: string): void {

    const confirmar = confirm(
      '¿Está seguro de eliminar este personaje?'
    );

    if (!confirmar) {
      return;
    }

    this.personajeService.eliminarPersonaje(id).subscribe({
      next: () => {
        alert('Personaje eliminado correctamente.');
        this.listarPersonajes();
      },
      error: (error) => {
        console.error('Error al eliminar:', error);
      }
    });
  }

  cancelarEdicion(): void {
    this.limpiarFormulario();
  }

  limpiarFormulario(): void {

    this.personaje = {
      nombre: '',
      especie: '',
      genero: '',
      estado: '',
      imagen: ''
    };

    this.editando = false;
    this.idEditando = '';
  }
}