import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HomeComponent } from './components/home/home.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', redirectTo: '/login', pathMatch: "full" },
    { path: 'login', component: LoginComponent },
    { path: 'home', loadComponent: () => import('./components/home/home.component').then(mod => mod.HomeComponent)},
    { path: 'quien-soy', loadComponent: () => import('./components/quien-soy/quien-soy.component').then(mod => mod.QuienSoyComponent)},
    { path: 'registro', loadComponent: () => import('./components/registro/registro.component').then(mod => mod.RegistroComponent)},
    { path: 'ahorcado', loadComponent: () => import('./components/ahorcado/ahorcado.component').then(mod => mod.AhorcadoComponent)},
    { path: 'cartas', loadComponent: () => import('./components/cartas/cartas.component').then(mod => mod.CartasComponent)},
    { path: 'preguntados', loadComponent: () => import('./components/preguntados/preguntados.component').then(mod => mod.PreguntadosComponent)},
    { path: 'encuesta', loadComponent: () => import('./components/encuesta/encuesta.component').then(mod => mod.EncuestaComponent)},
    { path: 'punteria', loadComponent: () => import('./components/punteria/punteria.component').then(mod => mod.PunteriaComponent)},
    { path: 'resultados', loadComponent: () => import('./components/resultados/resultados.component').then(mod => mod.ResultadosComponent)},
    { path: 'encuestas', loadComponent: () => import('./components/listado-encuestas/listado-encuestas.component').then(mod => mod.ListadoEncuestasComponent),
        canActivate: [AdminGuard],},
    { path: '**', component: PageNotFoundComponent},
    


    
];
