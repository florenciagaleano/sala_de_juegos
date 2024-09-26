import { Component } from '@angular/core';
import { CartasService } from '../../services/cartas/cartas.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LogoutComponent } from '../navbar/logout.component';
import { ChatComponent } from '../chat/chat.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cartas',
  standalone: true,
  imports: [FormsModule,CommonModule,LogoutComponent,ChatComponent],
  templateUrl: './cartas.component.html',
  styleUrl: './cartas.component.css'
})
export class CartasComponent {
  currentCard: any;
  nextCard: any;
  intentos = 0;
  intentosFallidos = "💗 💗 💗 💗 💗 💗 💗 💗 💗 "
  mayorSeleccionado = false;
  perdio = false;
  gano = false;
  contador = 0;
  constructor(private cardService: CartasService, private router : Router) { }

  ngOnInit(): void {
    this.getNewCard();
  }

  reiniciar(){
    this.intentos = 0;
    this.intentosFallidos = "💗 💗 💗 💗 💗 💗 💗 💗 💗 "
    this.mayorSeleccionado = false;
    this.perdio = false;
    this.gano = false;
    this.getNewCard();
    this.contador = 0;
  }

  async getNewCard() {
    this.currentCard = await this.cardService.getCard();
    this.nextCard = await this.cardService.getCard();
  }

  async seleccionarMayor() {
    this.mayorSeleccionado = true;
    await this.evaluateGuess();
  }

  async seleccionarMenor() {
    this.mayorSeleccionado = false;
    await this.evaluateGuess();
  }

  async evaluateGuess() {
    const result = await this.cardService.cardIsHigher(this.currentCard, this.nextCard);
    if(!((result && this.mayorSeleccionado) || (!result && !this.mayorSeleccionado))){
      this.intentos++;
    }else{
      this.contador++;
    }

    if(this.intentos == 9){
      this.perdio = true;
    }else if(this.contador == 10){
      this.gano = true;
    }

    this.currentCard = this.nextCard;
    this.nextCard = await this.cardService.getCard();
    this.actualizarVidas();
  }

  actualizarVidas(){
    this.intentosFallidos = "";
    for (let index = 0; index < 9 - this.intentos; index++) {
      this.intentosFallidos += "💗 ";
    }
  }


  goTo(path: string = '') {
    if (path === 'home') {
      this.router.navigate(['/home']);
    }
  }

}
