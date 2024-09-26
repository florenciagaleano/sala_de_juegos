import { Component } from '@angular/core';
import { LogoutComponent } from '../navbar/logout.component';

@Component({
  selector: 'app-quien-soy',
  standalone: true,
  imports: [LogoutComponent],
  templateUrl: './quien-soy.component.html',
  styleUrl: './quien-soy.component.css'
})
export class QuienSoyComponent {

}
