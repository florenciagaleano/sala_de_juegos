import { Component } from '@angular/core';
import { LogoutComponent } from '../navbar/logout.component';
import { Router } from '@angular/router';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LogoutComponent, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(private router : Router){}

  irAJuego(juego : string){
    this.router.navigate(['/' + juego]);
  }
}
