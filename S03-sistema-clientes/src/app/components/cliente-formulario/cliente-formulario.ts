import {
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface ClienteFormularioDatos {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  ciudad: string;
}

@Component({
  selector: 'app-cliente-formulario',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './cliente-formulario.html',
  styleUrl: './cliente-formulario.css'
})
export class ClienteFormulario {

  @Output()
  guardar = new EventEmitter<ClienteFormularioDatos>();

  @Output()
  cancelar = new EventEmitter<void>();

  formulario: ClienteFormularioDatos = {
    id: 0,
    nombre: '',
    apellido: '',
    correo: '',
    telefono: '',
    ciudad: ''
  };

  @Input()
  set clienteEditar(cliente: ClienteFormularioDatos | null) {

    if (cliente) {
      this.formulario = { ...cliente };
    } else {
      this.limpiarFormulario();
    }
  }

  guardarCliente() {

    if (
      !this.formulario.nombre ||
      !this.formulario.apellido ||
      !this.formulario.correo ||
      !this.formulario.telefono ||
      !this.formulario.ciudad
    ) {

      alert('Por favor completa todos los campos');
      return;
    }

    this.guardar.emit({
      ...this.formulario
    });

    this.limpiarFormulario();
  }

  cancelarEdicion() {
    this.limpiarFormulario();
    this.cancelar.emit();
  }

  limpiarFormulario() {

    this.formulario = {
      id: 0,
      nombre: '',
      apellido: '',
      correo: '',
      telefono: '',
      ciudad: ''
    };
  }
}