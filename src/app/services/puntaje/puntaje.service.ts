import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, Firestore, limit, orderBy, query, where } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';
import { Punto } from '../../models/punto';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PuntajeService {

  constructor(private firestore : Firestore, private authService : AuthService){}
  guardarPuntos(juego:string,puntos:string){
    let col = collection(this.firestore, 'puntos');
    addDoc(col, { "puntos": puntos, "usuario": this.authService.getCurrentUser(),"juego": juego, "fecha": new Date()})

  }

  obtenerPuntosTop5PorJuego(juego: string): Observable<Punto[]> {
    let colPuntos = collection(this.firestore, 'puntos');
    const puntosQuery = query(
        colPuntos,
        where('juego', '==', juego),  
        orderBy('puntos', 'desc'),    
        limit(5)                      
    );

    const observable = collectionData(puntosQuery, { idField: 'id' });

    return observable.pipe(
        map((data: any[]) => {
            return data.map(item => new Punto(
                item.usuario,
                item.fecha.toDate(),
                item.juego,
                item.puntos
            ));
        })
    );
}

obtenerPuntos(): Observable<Punto[]> {
  let colPuntos = collection(this.firestore, 'puntos');
  const puntosQuery = query(
      colPuntos,
      orderBy('juego', 'desc'),    
  );

  const observable = collectionData(puntosQuery, { idField: 'id' });

  return observable.pipe(
      map((data: any[]) => {
          return data.map(item => new Punto(
              item.usuario,
              item.fecha.toDate(),
              item.juego,
              item.puntos
          ));
      })
  );
}


}
