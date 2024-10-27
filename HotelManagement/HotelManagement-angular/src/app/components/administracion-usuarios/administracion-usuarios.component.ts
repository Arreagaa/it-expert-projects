import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//USUARIOS
import { Usuario } from 'src/app/models/usuario.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-administracion-usuarios',
  templateUrl: './administracion-usuarios.component.html',
  styleUrls: ['./administracion-usuarios.component.scss'],
  providers: [ UsuarioService ]
})
export class AdministracionUsuariosComponent implements OnInit {

  public token;

  //USUARIO
  public usuarioModelGet: Usuario;
  public usuarioModelPost: Usuario;
  public usuarioModelGetId: Usuario;

  constructor(private _usuarioService: UsuarioService) {
    this.usuarioModelPost = new Usuario('','', '','', '', '','','');
    this.usuarioModelGetId = new Usuario('','','','','','','', '');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getUsuarios();
  }

  getUsuarios(){
    this._usuarioService.obtenerClientes(this.token).subscribe(
      (response) => {
        this.usuarioModelGet = response.usuarios;
        console.log(response);
        console.log(this.usuarioModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getUsuariosId(idUsuarios){
    this._usuarioService.obtenerClienteId(idUsuarios, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.usuarioModelGetId = response.usuarios;
        console.log(response);
        console.log(this.usuarioModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  putUsuarios(){
    this._usuarioService.editarClientes(this.usuarioModelGetId,this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getUsuarios();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en el Usuario',
          text: '¡Puedes Revisar el Usuario Actualizado!',
          footer: '<a>Función concretada correctamente.</a>'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: 'No dejes campos vacios, ¡gracias!'
        })
      }
    )
  }

}
