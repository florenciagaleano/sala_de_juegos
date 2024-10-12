import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  rand: number = 0;
  http = inject(HttpClient);

  constructor() {}

  getPeliculas(): Observable<any[]> {
    return this.http
      .get<any[]>('https://api-movies.fly.dev/api/v1/movies')
      .pipe(
        map((peliculas) =>
          peliculas.sort((a, b) => {
            if (a.title < b.title) {
              return -1;
            } else if (a.title > b.title) {
              return 1;
            } else {
              return 0;
            }
          })
        )
      );
  }

  getPelicula(): Observable<any> {
    return new Observable((observer) => {
      this.getPeliculas().subscribe((peliculas) => {
        let peliSeleccionada: any;
        do {
          this.rand = Math.floor(Math.random() * peliculas.length);
          peliSeleccionada = peliculas[this.rand];
        } while (!peliSeleccionada);

        observer.next(peliSeleccionada);
        observer.complete();
      });
    });
  }

  getOpcionesPeliculas(): Observable<any[]> {
    return new Observable((observer) => {
      this.getPeliculas().subscribe((peliculas) => {
        let opcionesPeliculas: any[] = [];
        let seleccionadas: Set<number> = new Set();
        while (opcionesPeliculas.length < 4) {
          let rand = Math.floor(Math.random() * peliculas.length);
          if (!seleccionadas.has(rand)) {
            seleccionadas.add(rand);
            opcionesPeliculas.push(peliculas[rand]);
          }
        }
        observer.next(opcionesPeliculas);
        observer.complete();
      });
    });
  }
  
  getPreguntaConOpciones(): Observable<any> {
    return new Observable((observer) => {
      this.getOpcionesPeliculas().subscribe((opciones) => {
        let randIndex = Math.floor(Math.random() * opciones.length);
        let correcta = opciones[randIndex];
        observer.next({
          imagen: correcta.backdrops[3],//aca pongo el 3 pq algunos en el 0 o 1 tenian el nombre de las pelis
          opciones: opciones.map(o => o.title),
          correcta: correcta.title
        });
        observer.complete();
      });
    });
  }
}
