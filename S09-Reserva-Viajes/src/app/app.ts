
import { Component } from '@angular/core';
import {
  AbstractControl,
  ValidationErrors,
  ValidatorFn,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

// Validador personalizado: evita textos con solo espacios
export function sinEspaciosBlancos(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const valor = control.value;

    if (valor === null || valor === undefined || valor === '') {
      return null;
    }

    return String(valor).trim().length === 0
      ? { sinEspacios: true }
      : null;
  };
}

// Validador personalizado: impide fechas anteriores a hoy
export function fechaNoPasada(
  control: AbstractControl
): ValidationErrors | null {

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

// Estructura de una reserva
interface Reserva {
  id: number;
  nombre: string;
  documento: string;
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

      // Nombre obligatorio, mínimo 4 caracteres
      nombre: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(50),
        sinEspaciosBlancos()
      ]],

      // DNI o pasaporte alfanumérico
      documento: ['', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z0-9]{8,12}$/)
      ]],

      // Destino obligatorio, mínimo 4 caracteres
      destino: ['', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(60),
        sinEspaciosBlancos()
      ]],

      // Fecha actual o futura
      fecha: ['', [
        Validators.required,
        fechaNoPasada
      ]],

      // Cantidad de pasajes de 1 a 10
      pasajes: [1, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
        Validators.pattern(/^[0-9]+$/)
      ]],

      // Celular de exactamente 9 dígitos
      celular: ['', [
        Validators.required,
        Validators.pattern(/^[0-9]{9}$/)
      ]],

      // Correo electrónico válido
      correo: ['', [
        Validators.required,
        Validators.email
      ]]

    });
  }

  // Acceso a los controles desde HTML
  get f() {
    return this.formulario.controls;
  }

  // Fecha mínima permitida
  get fechaMinima(): string {

    const hoy = new Date();

    return [
      hoy.getFullYear(),
      String(hoy.getMonth() + 1).padStart(2, '0'),
      String(hoy.getDate()).padStart(2, '0')
    ].join('-');
  }

  // Guardar una reserva
  guardar(): void {

    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const datos = this.formulario.value;

    const nuevaReserva: Reserva = {
      id: this.siguienteId++,
      nombre: datos.nombre.trim(),
      documento: datos.documento.trim().toUpperCase(),
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

    // Limpiar el formulario después del registro
    this.formulario.reset({
      nombre: '',
      documento: '',
      destino: '',
      fecha: '',
      pasajes: 1,
      celular: '',
      correo: ''
    });
  }

  // Cancelar una reserva
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

  // Eliminar una reserva
  eliminar(id: number): void {

    this.reservas = this.reservas.filter(
      r => r.id !== id
    );

    this.mensajeExito =
      'El registro fue eliminado correctamente.';
  }

  // Cambiar el filtro de reservas
  cambiarFiltro(
    nuevoFiltro: 'Todas' | 'Activa' | 'Cancelada'
  ): void {
    this.filtro = nuevoFiltro;
  }

  // Mostrar reservas según el filtro
  get reservasFiltradas(): Reserva[] {

    if (this.filtro === 'Todas') {
      return this.reservas;
    }

    return this.reservas.filter(
      r => r.estado === this.filtro
    );
  }

  // Contar reservas activas
  get totalActivas(): number {
    return this.reservas.filter(
      r => r.estado === 'Activa'
    ).length;
  }

  // Contar reservas canceladas
  get totalCanceladas(): number {
    return this.reservas.filter(
      r => r.estado === 'Cancelada'
    ).length;
  }

  // Cerrar mensaje de confirmación
  cerrarMensaje(): void {
    this.mensajeExito = '';
  }

}
