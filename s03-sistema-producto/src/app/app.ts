import { Component } from '@angular/core';

import { Navbar } from './components/navbar/navbar';

import {
  ClienteLista
} from './components/cliente-lista/cliente-lista';

import {
  ClienteFormulario,
  ClienteFormularioDatos
} from './components/cliente-formulario/cliente-formulario';

import {
  Cliente
} from './components/cliente-card/cliente-card';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    Navbar,
    ClienteFormulario,
    ClienteLista
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  clienteSeleccionado: ClienteFormularioDatos | null = null;

  clientes: Cliente[] = [
    {
      id: 1,
      nombre: 'Luis',
      apellido: 'Calderón',
      correo: 'luis.calderon@vallegrande.edu.pe',
      telefono: '915163977',
      ciudad: 'Cajamarca-Chota'
    },
    {
      id: 2,
      nombre: 'Carlos',
      apellido: 'Ramírez',
      correo: 'carlos@gmail.com',
      telefono: '986123456',
      ciudad: 'Cañete'
    },
    {
      id: 3,
      nombre: 'Ana',
      apellido: 'López',
      correo: 'ana@gmail.com',
      telefono: '985456789',
      ciudad: 'Ica'
    },
    {
      id: 4,
      nombre: 'Jorge',
      apellido: 'Mendoza',
      correo: 'jorge@gmail.com',
      telefono: '984741258',
      ciudad: 'Chincha'
    },
    {
      id: 5,
      nombre: 'Daniel',
      apellido: 'Flores',
      correo: 'daniel@gmail.com',
      telefono: '983852741',
      ciudad: 'Lima'
    }
  ];

  guardarCliente(cliente: ClienteFormularioDatos) {

    if (cliente.id === 0) {

      const nuevoId =
        this.clientes.length > 0
          ? Math.max(...this.clientes.map(c => c.id)) + 1
          : 1;

      this.clientes = [
        ...this.clientes,
        {
          ...cliente,
          id: nuevoId
        }
      ];

      alert('Cliente registrado correctamente');

    } else {

      this.clientes = this.clientes.map(c =>
        c.id === cliente.id
          ? { ...cliente }
          : c
      );

      alert('Cliente actualizado correctamente');
    }

    this.clienteSeleccionado = null;
  }

  editarCliente(cliente: Cliente) {
    this.clienteSeleccionado = { ...cliente };

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  eliminarCliente(id: number) {

    const confirmar = confirm(
      '¿Estás seguro de eliminar este cliente?'
    );

    if (confirmar) {
      this.clientes = this.clientes.filter(
        cliente => cliente.id !== id
      );

      alert('Cliente eliminado correctamente');
    }
  }

  cancelarEdicion() {
    this.clienteSeleccionado = null;
  }
}