import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatComponent } from '../chat/chat.component';
import { Router } from '@angular/router';
import { PuntajeService } from '../../services/puntaje/puntaje.service';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    NavbarComponent,
    ChatComponent
  ],
  providers: [],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {
  letra: string = '';
  title = "Ahorcado";
  palabras = ["cortina", "secador", "pulover", "teclado"];
  palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
  palabraOculta = "_ ".repeat(this.palabra.length);
  intentos = 0;
  gano = false;
  perdio = false;
  intentosFallidos = "💗 💗 💗 💗 💗 💗 ";
  imagenAhorcado = '../../../assets/ahorcado/ahorcado_0.png';
  presionadas: Set<string> = new Set();
  letras = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z"
  ];

  constructor(private router : Router, private puntajeService : PuntajeService){}

  enviarLetra(letra : string) {
    if (/^[a-zA-Z]$/.test(this.letra)) {
      this.comprobar(this.letra.toUpperCase());
    } else {
      console.log("Ingrese una letra válida.");
    }
    this.letra = '';
  }

  comprobar(letra: string) {
    this.existeLetra(letra);
    const palabraOcultaArreglo = this.palabraOculta.split(" ");

    for (let i = 0; i < this.palabra.length; i++) {
      if (this.palabra[i] === letra) {
        palabraOcultaArreglo[i] = letra;
      }
    }
    this.presionadas.add(letra);
    this.palabraOculta = palabraOcultaArreglo.join(" ");
    this.verificaGanador();
    this.actualizarVidas();
  }

  verificaGanador() {
    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");
    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      console.log("Usuario GANO");
      this.puntajeService.guardarPuntos("Ahorcado", (6 - this.intentos).toString()); //guardo la cantidad de vidas que quedaron como puntos
    }
    if (this.intentos === 6) {
      this.perdio = true;
      console.log("Usuario perdio");
    }
  }

  actualizarVidas(){
    this.intentosFallidos = "";
    for (let index = 0; index < 6 - this.intentos; index++) {
      this.intentosFallidos += "💗 ";
    }

    this.imagenAhorcado = `../../../assets/ahorcado/ahorcado_${this.intentos}.png`; // Actualiza la imagen en función de los intentos
  }

  existeLetra(letra: string) {
    if (this.palabra.indexOf(letra) >= 0) {
      //console.log("La letra existe" + letra);
    } else {
      this.intentos++;
    }
  }

  goTo(path: string = '') {
    if (path === 'home') {
      this.router.navigate(['/home']);
    }
  }

  reiniciar(){
    this.palabra = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.intentos = 0;
    this.gano = false;
    this.perdio = false;
    this.intentosFallidos = "💗 💗 💗 💗 💗 💗 💗 💗 💗 ";
    this.palabraOculta = "_ ".repeat(this.palabra.length);
    this.imagenAhorcado = '../../../assets/ahorcado/ahorcado_0.png';
    this.presionadas.clear();
  }
}
