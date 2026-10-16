
import { Component } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

interface Reserva {
  id: number;
  nombre: string;
  destino: string;
  fecha: string;
  pasajes: number;
  celular: string;
  correo: string;
  estado: 'Activa' | 'Cancelada';
}

@Component({
  selector: 'app-root',
  standalone: false,
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  formulario: FormGroup;

  reservas: Reserva[] = [];

  filtro: 'Todas' | 'Activa' | 'Cancelada' = 'Todas';

  siguienteId = 1;

  mensajeExito = '';

  constructor(private fb: FormBuilder) {

    this.formulario = this.fb.group({

      nombre: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],

      destino: ['', [
        Validators.required,
        Validators.minLength(4)
      ]],

      fecha: ['', [
        Validators.required,
        this.fechaNoPasada
      ]],

      pasajes: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(5)
      ]],

      celular: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{9}$/)
      ]],

      correo: ['', [
        Validators.required,
        Validators.email
      ]]

    });
  }

  get f() {
    return this.formulario.controls;
  }

  guardar(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.value;

    const nuevaReserva: Reserva = {
      id: this.siguienteId++,
      nombre: datos.nombre.trim(),
      destino: datos.destino.trim(),
      fecha: datos.fecha,
      pasajes: Number(datos.pasajes),
      celular: datos.celular,
      correo: datos.correo.trim(),
      estado: 'Activa'
    };

    this.reservas.push(nuevaReserva);

    this.mensajeExito =
      'La reserva se registró correctamente.';

    this.filtro = 'Todas';

    this.formulario.reset({
      nombre: '',
      destino: '',
      fecha: '',
      pasajes: 1,
      celular: '',
      correo: ''
    });
  }

  cancelar(id: number): void {

    const reserva = this.reservas.find(
      r => r.id === id
    );

    if (reserva && reserva.estado === 'Activa') {
      reserva.estado = 'Cancelada';

      this.mensajeExito =
        'La reserva fue cancelada correctamente.';
    }
  }

  eliminar(id: number): void {

    this.reservas = this.reservas.filter(
      r => r.id !== id
    );

    this.mensajeExito =
      'El registro fue eliminado correctamente.';
  }

  cambiarFiltro(
    nuevoFiltro: 'Todas' | 'Activa' | 'Cancelada'
  ): void {
    this.filtro = nuevoFiltro;
  }

  get reservasFiltradas(): Reserva[] {

    if (this.filtro === 'Todas') {
      return this.reservas;
    }

    return this.reservas.filter(
      r => r.estado === this.filtro
    );
  }

  get totalActivas(): number {
    return this.reservas.filter(
      r => r.estado === 'Activa'
    ).length;
  }

  get totalCanceladas(): number {
    return this.reservas.filter(
      r => r.estado === 'Cancelada'
    ).length;
  }

  cerrarMensaje(): void {
    this.mensajeExito = '';
  }
  get fechaMinima(): string {
  const hoy = new Date();

  return [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, '0'),
    String(hoy.getDate()).padStart(2, '0')
  ].join('-');
}

fechaNoPasada(control: AbstractControl): ValidationErrors | null {
  if (!control.value) {
    return null;
  }

  const hoy = new Date();

  const fechaActual = [
    hoy.getFullYear(),
    String(hoy.getMonth() + 1).padStart(2, '0'),
    String(hoy.getDate()).padStart(2, '0')
  ].join('-');

  return control.value < fechaActual
    ? { fechaPasada: true }
    : null;
}

}
