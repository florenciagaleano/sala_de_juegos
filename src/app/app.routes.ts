import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'home', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent)},
    { path: 'quien-soy', loadComponent: () => import('./components/quien-soy/quien-soy.component').then(mod => mod.QuienSoyComponent)},
    { path: 'registro', loadComponent: () => import('./components/registro/registro.component').then(mod => mod.RegistroComponent)},
    { path: 'ahorcado', loadComponent: () => import('./components/ahorcado/ahorcado.component').then(mod => mod.AhorcadoComponent)},
    { path: 'cartas', loadComponent: () => import('./components/cartas/cartas.component').then(mod => mod.CartasComponent)},
    { path: '**', component: PageNotFoundComponent},
    


    
];
