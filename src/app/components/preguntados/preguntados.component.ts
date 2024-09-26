import { Component } from '@angular/core';
import { PeliculasService } from '../../services/peliculas/peliculas.service';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LogoutComponent } from '../navbar/logout.component';
import { ChatComponent } from '../chat/chat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [CommonModule,FormsModule,LogoutComponent,ChatComponent],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css'
})
export class PreguntadosComponent {

  pregunta: any;
  opciones: string[] = [];
  imagen: string = '';
  correcta: string = '';
  intentosFallidos = "💗 💗 💗 "
  intentos = 0;
  perdio = false;
  gano = false;
  contador = 0;
  cargando = false;

  constructor(private peliculasService: PeliculasService, private router : Router) {}

  reiniciar(){
    this.perdio = false;
    this.gano = false;
    this.intentos = 0;
    this.intentosFallidos = "💗 💗 💗 "
    this.contador = 0;
    this.nuevaPregunta();
  }

  ngOnInit() {
    this.nuevaPregunta();
  }

  nuevaPregunta(){
    this.cargando = true;
    this.peliculasService.getPreguntaConOpciones().subscribe((data) => {
      this.pregunta = data;
      this.opciones = data.opciones;
      this.imagen = data.imagen;
      this.correcta = data.correcta;
      this.cargando = false;
    });

  }

  verificarRespuesta(opcion: string) {
    if (opcion != this.correcta) {
      this.intentos++;
    }else{
      this.contador ++;
    }
    this.actualizarVidas();
    this.nuevaPregunta();
  }

  actualizarVidas(){
    this.intentosFallidos = "";

    if(this.intentos == 3){
      this.perdio = true;
    }else if(this.contador == 10){
      this.gano = true;
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


}
