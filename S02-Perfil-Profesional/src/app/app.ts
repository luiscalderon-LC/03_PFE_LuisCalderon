import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  nombre = 'Luis Calderón';
  carrera = 'Análisis de Sistemas Empresariales';

  habilidades = [
    {
      nombre: 'Angular',
      descripcion: 'Desarrollo Frontend',
      icono: '🅰️'
    },
    {
      nombre: 'HTML5',
      descripcion: 'Estructura Web',
      icono: '🌐'
    },
    {
      nombre: 'CSS3',
      descripcion: 'Diseño y estilos',
      icono: '🎨'
    },
    {
      nombre: 'Java',
      descripcion: 'Programación Orientada a Objetos',
      icono: '☕'
    },
    {
      nombre: 'SQL',
      descripcion: 'Bases de Datos',
      icono: '🗄️'
    },
    {
      nombre: 'Git & GitHub',
      descripcion: 'Control de Versiones',
      icono: '🔀'
    }
  ];

  proyectos = [
    {
      numero: '01',
      nombre: 'Registro de Asistencia para Empresas',
      descripcion:
        'Esta aplicación fue desarrollada con el objetivo de reducir el tiempo y llevar un orden de su personal en la hobra.',
      tecnologia: 'Angular'
    },
    {
      numero: '02',
      nombre: 'Sistema de Reservas Médicas',
      descripcion:
        'Aplicación web para gestionar reservas médicas y organizar la información de las citas de los usuarios.',
      tecnologia: 'Angular'
    },
    {
      numero: '03',
      nombre: 'Pagina web APPA-EL SOLAR "ICA"',
      descripcion:
        'Este proyecto fue desarrollado para la Asociacion Pequeño Productores Agropecuarios, con el objetivo de brindar información sobre la asociación y sus actividades.',
      tecnologia: 'SQL'
    }
  ];

  irASeccion(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}