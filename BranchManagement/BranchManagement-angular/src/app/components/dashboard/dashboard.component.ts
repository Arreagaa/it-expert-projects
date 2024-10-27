import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SucursalesService } from 'src/app/services/sucursales.service';
import { ActivatedRoute } from '@angular/router';
//SUCURSALES
import { Sucursales } from 'src/app/models/sucursales.model';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ SucursalesService, UsuarioService ]
})
export class DashboardComponent implements OnInit {

  public token;
  public idEmpresa;

  //SUCURSALES
  public sucursalModelGet: Sucursales;
  public sucursalModelPost: Sucursales;
  public sucursalModelId: Sucursales;

  constructor(private _sucursalesService: SucursalesService, public _usuarioService: UsuarioService, public _activatedRoute: ActivatedRoute) {
    this.sucursalModelPost = new Sucursales('','', '','');
    this.sucursalModelId = new Sucursales('','','','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      console.log(dataRuta.get('idEmpresa'));
      this.getSucursales(dataRuta.get('idEmpresa'));

      this.idEmpresa = dataRuta.get('idEmpresa')
    })
    //this.getSucursales();
  }

  getSucursales(idEmpresa){
    this._sucursalesService.obtenerSucursales(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.sucursalModelGet = response.sucursales;
        console.log(response);
        console.log(response.sucursales);
        console.log(this.sucursalModelGet);

      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getSucursalId(idSucursal){
    this._sucursalesService.obtenerSucursalId(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.sucursalModelId = response.sucursales;
        console.log(response);
        console.log(this.sucursalModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postSucursales(addForm){
    this._sucursalesService.agregarSucursal(this.sucursalModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales(this.idEmpresa);
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado la Sucursal Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes revisar la nueva Sucursal.</a>'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>'
        })
      }
    )
  }

  deleteSucursal(idSucursal) {
    this._sucursalesService.eliminarSucursal(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales(this.idEmpresa);
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  putSucursales(){
    this._sucursalesService.editarEmpresa(this.sucursalModelId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales(this.idEmpresa);
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en la Sucursal',
          text: '¡Puedes Revisar la Sucursal Actualizada!',
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
