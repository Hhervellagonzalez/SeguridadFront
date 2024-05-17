import { Component } from '@angular/core';
import { JwtAuthenticationResponse } from '../../../_modelo/JwtAuthenticationResponse';
import { LoginService } from '../../../_servicio/login.service';
import { SignInRequest } from '../../../_modelo/SignInRequest';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { entorno } from '../../../_entorno/entorno';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  respuesta:JwtAuthenticationResponse={
    token:""
  }

  datos:SignInRequest={
    email:"",
    password:""
  }

constructor(private Servicio:LoginService, private router:Router){}

autenticar(){
  this.Servicio.autenticar(this.datos)
  .subscribe((data) => {
    console.log("token->" + data.token);
    sessionStorage.setItem(entorno.TOKEN_NAME, data.token);

    this.router.navigate(['/contenido'])
  }
)}
}
