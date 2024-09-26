import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Usuario } from '../../models/usuario';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  usuario: Usuario = new Usuario("", "");
  errorMail: number = -1;

  constructor(private authService : AuthService, private router: Router,private firestore : Firestore) {
  }

  registrarse() {
    let col = collection(this.firestore, 'registros');

    this.authService.crearUsuario(this.usuario.mail, this.usuario.clave).then((res) => {
      if (res.user.email !== null) {
        this.usuario.mail = res.user.email;
        this.router.navigate(['/home']);
        this.errorMail = -1;
        addDoc(col, { "fecha": new Date(), "usuario": this.usuario.mail});
        this.authService.guardarUsuario(this.usuario.mail);
      }

    }).catch((e) => {
      console.log(e);
      this.errorMail = 1;
    });
  }

  goToLogin() {
    this.router.navigate(["/login"]);
  }

}
