export class Encuesta {
    usuario: string;
    nombre: string;
    apellido: string;
    edad: number;
    telefono: string;
    juego_fav: string;
    como_conociste: string;
    opinion: string;
    fecha: any;

    constructor(usuario: string, nombre: string, apellido: string, edad: number, telefono: string, juego_fav: string, como_conociste: string, opinion: string, fecha: string) {
        this.usuario = usuario;
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.telefono = telefono;
        this.juego_fav = juego_fav;
        this.como_conociste = como_conociste;
        this.opinion = opinion;
        this.fecha = fecha;
    }

}
