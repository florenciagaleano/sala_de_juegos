import { Injectable } from '@angular/core';
import { addDoc, collection, Firestore } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(private firestore : Firestore, private authService : AuthService){}
  guardarPuntos(juego:string,puntos:string){
    let col = collection(this.firestore, 'puntos');
    addDoc(col, { "puntos": puntos, "usuario": this.authService.getCurrentUser(),"juego": juego, "fecha": new Date()})

  }
}
