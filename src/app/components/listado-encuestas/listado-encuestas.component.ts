import { Component, OnInit, OnDestroy } from '@angular/core';
import { Firestore, collection, query, where, collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-listado-encuestas',
  standalone: true,
  imports: [CommonModule,FormsModule,NavbarComponent,ChatComponent],
  templateUrl: './listado-encuestas.component.html',
  styleUrl: './listado-encuestas.component.css'
})
export class ListadoEncuestasComponent {
  encuestas: any[] = [];
  currentUser = this.authService.getCurrentUser();
  sub!: Subscription;

  constructor(private firestore: Firestore, private authService: AuthService) {}

  ngOnInit(): void {
    this.leerEncuestas();
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  leerEncuestas(): void {
    const col = collection(this.firestore, 'encuesta');
    this.sub = collectionData(col, { idField: 'id' }).subscribe((respuestas: any) => {
      this.encuestas = respuestas;
    });
    console.log(this.encuestas);
  }

  formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    return date.toLocaleDateString(); 
  }

}
