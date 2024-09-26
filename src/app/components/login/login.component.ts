import { Component } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HomeComponent } from '../home/home.component';
import { addDoc, collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { RegistroComponent } from '../registro/registro.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,HomeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  usuario: Usuario = new Usuario("", "");
  loginExitoso: number = -1;

  constructor(private router: Router, private firestore : Firestore, private authService : AuthService) {}

  goTo(path: string) {
    this.router.navigate([path]);
  }


  login() {
    let col = collection(this.firestore, 'registros');

    this.authService.signIn(this.usuario.mail,this.usuario.clave).then((res) => {
      addDoc(col, { "fecha": new Date(), "usuario": this.usuario.mail});
      this.authService.guardarUsuario(this.usuario.mail);
      this.loginExitoso = 1;
      this.router.navigate(['/home']);
    }).catch((e) => {
      this.loginExitoso = 0;
      console.log(e);
    });
    
  }

  registrarse(){
    this.router.navigate(['/registro']);
  }

  entrarComoInvitado(){
    this.usuario.mail = 'invitado@gmail.com';
    this.usuario.clave = '123456'
  }

  closeError(){
    this.loginExitoso = -1;
  }

}
function res(value: any) {
  throw new Error('Function not implemented.');
}

