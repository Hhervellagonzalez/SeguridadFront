import { Component, OnInit } from '@angular/core';
import { entorno } from '../../../_entorno/entorno';
import { ContenidoService } from '../../../_servicio/contenido.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-contenido',
  standalone: true,
  imports: [],
  templateUrl: './contenido.component.html',
  styleUrl: './contenido.component.css'
})
export class ContenidoComponent implements OnInit {
  contenido:string="";
  usuario:string="";

  constructor(private servicio:ContenidoService,
    public jwtHelper: JwtHelperService
  ){}

  ngOnInit(): void {

    const token = sessionStorage.getItem(entorno.TOKEN_NAME)
    let tokenDecodificado =token!==null?this.jwtHelper.decodeToken(token):null;
    this.usuario = tokenDecodificado.sub;
    
    this.servicio.obtenerContenido().subscribe(
      data => {this.contenido = data.contenido}
    )
  }

}


