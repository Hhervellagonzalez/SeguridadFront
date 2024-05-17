import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';
import { entorno } from '../_entorno/entorno';
import { LoginService } from './login.service';


export const miGuardiaGuard: CanActivateFn = (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const jwtHelper = inject(JwtHelperService);

  let rpta = loginService.estaLogueado();
  if (!rpta) {
    console.log('no esta logueado-false');
    loginService.cerrarSesion();
    return false;
  } else {
    let token = sessionStorage.getItem(entorno.TOKEN_NAME);
    if (token && !jwtHelper.isTokenExpired(token)) {
      console.log("no ha expirado el token");
      return true;
    } else {
      loginService.cerrarSesion();
      return false;
    }
  }
};