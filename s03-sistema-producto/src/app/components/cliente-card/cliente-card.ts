import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  correo: string;
  telefono: string;
  ciudad: string;
}

@Component({
  selector: 'app-cliente-card',
  standalone: true,
  imports: [],
  templateUrl: './cliente-card.html',
  styleUrl: './cliente-card.css'
})
export class ClienteCard {

  @Input() cliente!: Cliente;

  @Output() editar = new EventEmitter<Cliente>();
  @Output() eliminar = new EventEmitter<number>();

  editarCliente() {
    this.editar.emit(this.cliente);
  }

  eliminarCliente() {
    this.eliminar.emit(this.cliente.id);
  }
}