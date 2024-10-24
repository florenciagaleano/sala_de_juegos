import { Component, Input } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { PuntajeService } from '../../services/puntaje/puntaje.service';
import { Punto } from '../../models/punto';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resultados',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './resultados.component.html',
  styleUrl: './resultados.component.css'
})
export class ResultadosComponent  {
  @Input() juego: string = '';
  top5Puntos: Punto[] = [];
  
  constructor(private puntajeService : PuntajeService) { }

  ngOnInit(): void {
    if (this.juego) {
      this.cargarPuntos(this.juego); 
    }
  }

  cargarPuntos(juego: string): void {
    this.puntajeService.obtenerPuntosTop5PorJuego(juego).subscribe((puntos: Punto[]) => {
      this.top5Puntos = puntos;
    });
  }

  formatearFecha(fecha: Date): string {
    const opcionesFecha: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    return `${fechaFormateada} ${horaFormateada}`;
  }

}
