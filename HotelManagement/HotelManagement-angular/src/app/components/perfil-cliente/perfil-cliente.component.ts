import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-perfil-cliente',
  templateUrl: './perfil-cliente.component.html',
  styleUrls: ['./perfil-cliente.component.scss'],
  providers: [UsuarioService]
})
export class PerfilClienteComponent implements OnInit {
  public usuarioModel: Usuario;

  user;
  name;
  email;
  password;
  id;

  public usuarioModelId: Usuario;
  public identidad;

  constructor(
    public _usuarioService:UsuarioService,
    public _router: Router
    ) { this.usuarioModelId = new Usuario('','','','','','','','');}

  ngOnInit(): void {

    this.user = this._usuarioService.obtenerIdentidad();
    this.name = this.user.nombre;
    this.email = this.user.email;
    this.password = this.user.password;

  }

  getClienteId(id){
    this._usuarioService.obtenerClienteId(id, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.usuarioModelId = response.usuarios;
        console.log(response);
        console.log(this.usuarioModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  updateUser(){
    this._usuarioService.updateUser(this.user._id, this.user, this._usuarioService.obtenerToken()).subscribe({
      next: (response:any)=> {

        localStorage.setItem('identidad', JSON.stringify(response.usuarios))

        Swal.fire({
          icon: 'success',
          title: 'Has Actualizado tú Perfil Correctamente',
          text: '¡Cambios Realizados!',
          footer: '<a>Esperamos que todo sea de tu agrado.</a>'
        })
        //this.getClienteId(this.id)
        this.identidad = this._usuarioService.obtenerIdentidad();

      },
      error: (err)=> console.log(<any>err)
    });
  }

  deleteUser() {
    this._usuarioService.deleteUser(this.user._id, this.user,this._usuarioService.obtenerToken()).subscribe(
      (response)=>{

        //localStorage.setItem('identidad', JSON.stringify(response.usuarios));
        localStorage.clear()

        Swal.fire({
          icon: 'success',
          title: 'Perfil Eliminado Correctamente',
          text: '¡Lamentamos que te retires!',
          footer: '<a>Esperamos que todo haya sido de tu agrado.</a>'
        })
        //this.getClienteId(this.id)
        this.identidad = this._usuarioService.obtenerIdentidad();

      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

}
