import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { inject } from '@angular/core';

export const AdminGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);

  if(auth.getIsAdmin() == 'true') {
    return true;
  }

  alert("El usuario debe ser Administrador");
  return  false;
};
