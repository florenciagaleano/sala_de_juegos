export class Punto {
    usuario: string = "";
    fecha: any = "";
    juego: string = "";
    puntos: string = "";

    constructor(usuario: string, fecha: string, juego: string, puntos: string) {
        this.usuario = usuario;
        this.fecha = fecha;
        this.juego = juego;
        this.puntos = puntos;
    }

}
