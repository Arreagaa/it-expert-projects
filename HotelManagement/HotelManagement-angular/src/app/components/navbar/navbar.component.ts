import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [ UsuarioService ]
})
export class NavbarComponent implements OnInit {

  /*public token;
  public identidad;*/

  constructor(public _usuarioService: UsuarioService) { }

  ngOnInit(): void {

    /*this.token = this._usuarioService.obtenerToken();
    this.identidad = this._usuarioService.obtenerIdentidad().rol;*/
  }

  logOut(){
    localStorage.clear()
  }
}
