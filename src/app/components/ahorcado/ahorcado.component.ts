import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxTouchKeyboardModule }  from 'ngx-touch-keyboard';
import { LogoutComponent } from '../navbar/logout.component';
import { ChatComponent } from '../chat/chat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [
    NgxTouchKeyboardModule,
    FormsModule,
    CommonModule,
    LogoutComponent,
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

  constructor(private router : Router){}

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
    this.palabraOculta = palabraOcultaArreglo.join(" ");
    this.verificaGanador();
    this.actualizarVidas();
  }

  verificaGanador() {
    const palabraArr = this.palabraOculta.split(" ");
    const palabraEvaluar = palabraArr.join("");
    this.intentosFallidos
    if (palabraEvaluar === this.palabra) {
      this.gano = true;
      console.log("Usuario GANO");
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

  }
}
