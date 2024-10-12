import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { addDoc, collection, orderBy, query } from 'firebase/firestore';
import { AuthService } from '../../services/auth/auth.service';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  chat : boolean = false;
  mensajes : any[] = [];
  private sub!:Subscription;
  nuevoMensaje: string = '';
  usuarioActual: string | null = null;
  esInvitado = false;

  constructor(private authService: AuthService,private firestore : Firestore){}

  ngOnInit() {
    this.usuarioActual = this.authService.getCurrentUser();
    this.getMensajes();
    //if(this.usuarioActual == 'invitado@gmail.com') this.esInvitado = true;
  }

  abrirChat(){
    this.chat = !this.chat;  
  }

  getMensajes(){
    let colMensajes = collection(this.firestore, 'mensajes');
    const mensajesQuery = query(colMensajes, orderBy('fecha', 'asc'));
    const observable = collectionData(mensajesQuery, { idField: 'id' });
    this.sub = observable.subscribe((respuesta:any) => {
      this.mensajes = respuesta.reverse();
      console.log(respuesta);
    });
  }

  enviarMensaje(mensaje : string){
    let col = collection(this.firestore, 'mensajes');
    addDoc(col, { "mensaje": mensaje, "usuario": this.usuarioActual, "fecha": new Date()})
    this.nuevoMensaje = "";
    this.getMensajes();
  }

  formatearFecha(fecha: Date): string {
    const opcionesFecha: Intl.DateTimeFormatOptions = { day: '2-digit', month: '2-digit' };
    const opcionesHora: Intl.DateTimeFormatOptions = { hour: '2-digit', minute: '2-digit' };
    const fechaFormateada = fecha.toLocaleDateString('es-ES', opcionesFecha);
    const horaFormateada = fecha.toLocaleTimeString('es-ES', opcionesHora);
    return `${fechaFormateada} ${horaFormateada}`;
  }


}
