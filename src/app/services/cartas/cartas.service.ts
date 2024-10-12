import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartasService {
  private deckId: string | null = null; 
  private cartasMostradas: Set<string> = new Set();

  constructor() {}

  async inicializarMazo() {
    const response = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
    const data = await response.json();
    this.deckId = data.deck_id; 
    this.cartasMostradas.clear();
  }

  async getCard() {
    if (!this.deckId) {
      await this.inicializarMazo();
    }

    const response = await fetch(`https://deckofcardsapi.com/api/deck/${this.deckId}/draw/?count=1`);
    const data = await response.json();

    if (data.success) {
      const card = data.cards[0];
      this.cartasMostradas.add(card.code);
      return card;
    } else {
      throw new Error('No hay cartas disponibles.');
    }
  }

  cardIsHigher(currentCard: any, nextCard: any): Promise<boolean> {
    return new Promise((resolve) => {
      const cardValues: { [key: string]: number } = {
        'ACE': 1, 'KING': 13, 'QUEEN': 12, 'JACK': 11,
        '10': 10, '9': 9, '8': 8, '7': 7, '6': 6, '5': 5,
        '4': 4, '3': 3, '2': 2
      };

      const currentValue = cardValues[currentCard.value] || parseInt(currentCard.value, 10);
      const nextValue = cardValues[nextCard.value] || parseInt(nextCard.value, 10);

      resolve(nextValue > currentValue);
    });
  }
}
