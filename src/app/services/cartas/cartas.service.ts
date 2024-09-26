import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartasService {

  constructor() { }
  getCard() {
    return fetch('https://deckofcardsapi.com/api/deck/new/draw/?count=1')
      .then(response => response.json())
      .then(data => data.cards[0]);
  }

  async cardIsHigher(currentCard: any, nextCard: any) {
    return nextCard.value > currentCard.value;
  }

}
