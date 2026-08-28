import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  ClienteCard,
  Cliente
} from '../cliente-card/cliente-card';

@Component({
  selector: 'app-cliente-lista',
  standalone: true,
  imports: [
    CommonModule,
    ClienteCard
  ],
  templateUrl: './cliente-lista.html',
  styleUrl: './cliente-lista.css'
})
export class ClienteLista {

  @Input() clientes: Cliente[] = [];

  @Output() editar = new EventEmitter<Cliente>();
  @Output() eliminar = new EventEmitter<number>();

  editarCliente(cliente: Cliente) {
    this.editar.emit(cliente);
  }

  eliminarCliente(id: number) {
    this.eliminar.emit(id);
  }
}