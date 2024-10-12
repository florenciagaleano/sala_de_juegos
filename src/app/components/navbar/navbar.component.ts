import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})

export class NavbarComponent {

  esHome : boolean = this.router.url == '/home';

  constructor(private authService : AuthService, private router: Router) {}

  logout(){
    this.authService.signOut();
    this.goTo('login');
  }
  
  goTo(ruta : string) {
    this.router.navigate([ruta]);
  }

  irAHome(){
    this.router.navigate(["/home"]);

  }

}
