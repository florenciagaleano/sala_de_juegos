import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatComponent } from '../chat/chat.component';
import { PuntajeService } from '../../services/puntaje/puntaje.service';
import { ResultadosComponent } from '../resultados/resultados.component';

@Component({
  selector: 'app-punteria',
  standalone: true,
  imports: [FormsModule, CommonModule,NavbarComponent,ChatComponent,ResultadosComponent],
  templateUrl: './punteria.component.html',
  styleUrl: './punteria.component.css'
})
export class PunteriaComponent {
  objetivosAleatorios: any = 'display:none;';
  comenzarJuego: string = 'display:block;';
  classObjetivo: string = '';

  myTimeout!: ReturnType<typeof setTimeout>;
  timerValue: number = 3000;

  btnsDeshabilidatos: boolean = false;
  intentosFallidos: string = "💗 💗 💗 ";
  intentos: number = 0;
  perdio: boolean = false;
  gano: boolean = false;
  contador: number = 0;
  resultados : boolean = false;

  juegoIniciado: boolean = false;

  constructor(private router: Router, private puntajeService : PuntajeService) {}

  ClickFueraDeObjetivo(event: MouseEvent) {
    if (!this.juegoIniciado) {
      this.juegoIniciado = true;
      return;
    }

    if ((event.target as HTMLElement).id !== 'target') {
      this.intentos++;
      this.actualizarVidas();
    }

    this.CrearObjetivoAleatorio(1);
  }

  ClickEnObjetivo() {
    if (this.myTimeout) clearTimeout(this.myTimeout);

    this.contador++;
    this.actualizarVidas();
    this.CrearObjetivoAleatorio(1);
  }

  IniciarJuego() {
    this.intentosFallidos = "💗 💗 💗 ";
    this.intentos = 0;
    this.contador = 0;
    this.btnsDeshabilidatos = true;
    this.comenzarJuego = 'display:none;';
    this.objetivosAleatorios = 'display:block;';
    this.classObjetivo = 'circulo';
    this.gano = false;
    this.perdio = false;
    this.resultados = false;
    this.CrearObjetivoAleatorio(0);
  }

  CrearObjetivoAleatorio(acerto: number) {
    if (acerto == -1) this.intentos++;
    this.actualizarVidas();

    this.timerValue = 1000;
    this.DefinirLugarDelObjetivo(95, 97);
  }

  DefinirLugarDelObjetivo(top: number, left: number) {
    this.objetivosAleatorios = 'display:block;';
    this.objetivosAleatorios += 'left:' + this.NumeroAleatorio(left) + '%;';
    this.objetivosAleatorios += 'top:' + this.NumeroAleatorio(top) + '%;';
  }

  NumeroAleatorio(numMax: number) {
    return Math.floor(Math.random() * numMax);
  }

  actualizarVidas() {
    this.intentosFallidos = "";

    if (this.intentos >= 3) {
      this.perdio = true;
    } else if (this.contador >= 30) {
      this.gano = true;
      if(this.gano) this.puntajeService.guardarPuntos("Punteria", (3 - this.intentos).toString()); //guardo la cantidad de vidas que quedaron como puntos

    }

    for (let index = 0; index < 3 - this.intentos; index++) {
      this.intentosFallidos += "💗 ";
    }
  }

  goTo(path: string = '') {
    if (path === 'home') {
      this.router.navigate(['/home']);
    }
  }

  verResultados() {
    this.resultados = true;
  }
}
