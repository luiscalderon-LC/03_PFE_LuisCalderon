
import { Component } from '@angular/core';

interface Participante {
  nombre: string;
  correo: string;
  especialidad: string;
  turno: string;
  modalidad: string;
  experiencia: string;
  estado: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.css'
})
export class App {

  // Datos del formulario
  nuevoParticipante: Participante = {
    nombre: '',
    correo: '',
    especialidad: '',
    turno: 'Mañana',
    modalidad: '',
    experiencia: '',
    estado: 'Activo'
  };

  // Lista de participantes registrados
  participantes: Participante[] = [];

  // Mensaje de confirmación
  mensaje = '';

  // Opciones del formulario
  especialidades = [
    'Desarrollo',
    'Redes',
    'Inteligencia Artificial'
  ];

  modalidades = [
    'Presencial',
    'Virtual'
  ];

  niveles = [
    'Principiante',
    'Intermedio',
    'Avanzado'
  ];

  estados = [
    'Activo',
    'Inactivo',
    'Pendiente'
  ];

  // Registrar un participante
  registrarParticipante() {

    const nombre = this.nuevoParticipante.nombre.trim();
    const correo = this.nuevoParticipante.correo.trim();

    if (
      nombre.length < 3 ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo) ||
      !this.nuevoParticipante.especialidad ||
      !this.nuevoParticipante.turno ||
      !this.nuevoParticipante.modalidad ||
      !this.nuevoParticipante.experiencia
    ) {
      this.mensaje = 'Completa correctamente todos los campos.';
      return;
    }

    this.participantes.push({
      ...this.nuevoParticipante,
      nombre,
      correo
    });

    this.mensaje = 'Participante registrado correctamente.';

    this.limpiarFormulario();
  }

  // Limpiar los campos después del registro
  limpiarFormulario() {
    this.nuevoParticipante = {
      nombre: '',
      correo: '',
      especialidad: '',
      turno: 'Mañana',
      modalidad: '',
      experiencia: '',
      estado: 'Activo'
    };
  }

  // Eliminar una inscripción
  eliminarParticipante(indice: number) {
    this.participantes.splice(indice, 1);
    this.mensaje = 'Inscripción eliminada correctamente.';
  }

  // Cambiar el estado del participante
  cambiarEstado(participante: Participante, estado: string) {
    participante.estado = estado;
    this.mensaje = 'Estado actualizado correctamente.';
  }

  // Indicadores de participantes
  get totalInscritos(): number {
    return this.participantes.length;
  }

  get totalManana(): number {
    return this.participantes.filter(
      participante => participante.turno === 'Mañana'
    ).length;
  }

  get totalNoche(): number {
    return this.participantes.filter(
      participante => participante.turno === 'Noche'
    ).length;
  }

}
