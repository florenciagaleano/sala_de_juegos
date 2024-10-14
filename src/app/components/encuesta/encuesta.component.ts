import { Component, OnInit, OnDestroy } from '@angular/core';
import { addDoc, collection, Firestore, query, where, updateDoc, doc } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { ChatComponent } from '../chat/chat.component';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { collectionData } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, NavbarComponent, ChatComponent],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent implements OnInit, OnDestroy {
  encuestas: any[] = [];
  encuestaForm!: FormGroup;
  encuestaEnviada: boolean = false;
  currentUser = this.authService.getCurrentUser();
  sub!: Subscription;

  constructor(private router: Router, private fb: FormBuilder, private firestore: Firestore, private authService: AuthService) { }

  ngOnInit(): void {
    this.encuestaForm = this.fb.group({
      edad: ['', [Validators.required, CustomValidators.edadValidator]],
      nombre: ['', [Validators.required, CustomValidators.soloLetras]],
      apellido: ['', [Validators.required, CustomValidators.soloLetras]],
      telefono: ['', [Validators.required, CustomValidators.telefonoValidator]],
      juego_fav: ['', Validators.required],
      como_conociste: ['', Validators.required],
      opinion: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  get edad(): number {
    return this.encuestaForm.get('edad')!.value;
  }

  get nombre(): string {
    return this.encuestaForm.get('nombre')!.value;
  }

  get apellido(): string {
    return this.encuestaForm.get('apellido')!.value;
  }

  get telefono(): string {
    return this.encuestaForm.get('telefono')!.value;
  }

  get juego_fav(): string {
    return this.encuestaForm.get('juego_fav')!.value;
  }

  get como_conociste(): string {
    return this.encuestaForm.get('como_conociste')!.value;
  }

  get opinion(): string {
    return this.encuestaForm.get('opinion')!.value;
  }

  isFieldInvalid(field: string): boolean {
    const control = this.encuestaForm.get(field);
    return control ? control.invalid && (control.dirty || control.touched) : false;
  }

  onSubmit(): void {
    if (this.encuestaForm.valid) {
      let col = collection(this.firestore, 'encuesta');
      const q = query(col, where("usuario", "==", this.currentUser));
      const observable = collectionData(q, { idField: 'id' });

      this.sub = observable.subscribe((respuesta: any) => {
        this.encuestas = respuesta;

        if (this.encuestas.length === 0) {
          // Si no existe una encuesta para el usuario, agregar una nueva
          addDoc(col, {
            "usuario": this.currentUser,
            "nombre": this.nombre,
            "apellido": this.apellido,
            "edad": this.edad,
            "telefono": this.telefono,
            "juego_fav": this.juego_fav,
            "como_conociste": this.como_conociste,
            "opinion": this.opinion
          }).then(() => {
            this.encuestaEnviada = true;
          });
        } else {
          const docRef = doc(this.firestore, `encuesta/${this.encuestas[0].id}`);
          updateDoc(docRef, {
            "nombre": this.nombre,
            "apellido": this.apellido,
            "edad": this.edad,
            "telefono": this.telefono,
            "juego_fav": this.juego_fav,
            "como_conociste": this.como_conociste,
            "opinion": this.opinion
          }).then(() => {
            this.encuestaEnviada = true;
          });
        }
      });

    } else {
      this.encuestaForm.markAllAsTouched();
    }

    console.log(this.encuestaEnviada);
  }

  goTo(path: string = '') {
    if (path === 'home') {
      this.router.navigate(['/home']);
    }
  }
}
