import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  titulo = 'Sistema de Reservas Médicas';

  citas = [
    {
      paciente: 'María López',
      especialidad: 'Medicina General',
      fecha: '20/08/2026',
      hora: '09:00 AM',
      estado: 'Confirmada'
    },
    {
      paciente: 'Carlos Ramírez',
      especialidad: 'Odontología',
      fecha: '20/08/2026',
      hora: '10:30 AM',
      estado: 'Pendiente'
    },
    {
      paciente: 'Ana Torres',
      especialidad: 'Pediatría',
      fecha: '21/08/2026',
      hora: '11:00 AM',
      estado: 'Confirmada'
    }
  ];

  totalCitas = 3;
  confirmadas = 2;
  pendientes = 1;

  nuevaCita() {
    alert('Formulario para registrar una nueva cita');
  }

  verCitas() {
    alert('Mostrando todas las citas registradas');
  }
}