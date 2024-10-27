import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UsuarioService]
})
export class LoginComponent implements OnInit {
  public usuarioModel: Usuario;

  constructor(
    private _usuarioService:UsuarioService,
    private _router: Router
    ) {
    this.usuarioModel = new Usuario(
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    );
  }

  ngOnInit(): void {
    // console.log(localStorage.getItem("token"))
  }

  getToken(){
    this._usuarioService.login(this.usuarioModel, "true").subscribe(
      (response)=>{
        console.log(response);
        localStorage.setItem("token", response.token)

      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  obtenerTokenPromesa(): Promise <any>{
    return new Promise((resolve, reject)=>{
      this._usuarioService.login(this.usuarioModel, "true").subscribe(
        (response)=>{
          console.log(response);
          localStorage.setItem("token", response.token)
          resolve(response)
        },
        (error)=>{
          console.log(<any>error);
        }
      )
    })

  }

  login(){
    this._usuarioService.login(this.usuarioModel, 'false').subscribe(
      (response)=>{
        this.obtenerTokenPromesa().then((respuesta)=>{
          localStorage.setItem("identidad", JSON.stringify(response.usuario))
          console.log(respuesta);
          if(response.usuario.rol == 'ROL_CLIENTE'){
            this._router.navigate(['/Usuario/Hoteles'])
          }else{
            this._router.navigate(['/Admin/Hoteles'])
          }

          if(response.usuario.rol == 'ROL_HOTEL'){
            this._router.navigate(['/Hotel/Habitaciones'])
          }
        });
        Swal.fire({
          icon: 'success',
          title: 'Has Iniciado Sesión Correctamente',
          text: '¡Bienvenido!',
          footer: '<a>Esperamos que todo sea de tu agrado.</a>'
        })

      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: '¡Revisa que la información este correcta!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>'
        })
      }
    )
  }

}
