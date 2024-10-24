import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: Auth) {  }

  crearUsuario(email : string, clave : string): Promise<any> {
    return createUserWithEmailAndPassword(this.auth, email, clave);
  }

  guardarUsuario(usuario : string){
    localStorage.setItem("usuarioActual",usuario);
    localStorage.setItem("esAdmin",usuario != 'floradmin@gmail.com' ? "false" : "true");

  }

  getIsAdmin(){
    return localStorage.getItem("esAdmin");
  }

  getCurrentUser() {
    return localStorage.getItem("usuarioActual");
  }

  signIn(email: string, password: string): Promise<any> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    return this.auth.signOut();
  }

}
