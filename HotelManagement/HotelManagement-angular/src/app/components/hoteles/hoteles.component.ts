import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//HOTELES
import { Hotel } from 'src/app/models/hotel.model';
import { HotelesService } from 'src/app/services/hoteles.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.scss'],
  providers: [ HotelesService, UsuarioService ]
})
export class HotelesComponent implements OnInit {

  public token;
  public buscar;

  //HOTELES
  public hotelModelGet: Hotel;
  public hotelModelPost: Hotel;
  public hotelModelGetId: Hotel;

  constructor(private _hotelesService: HotelesService, public _usuarioService: UsuarioService) {
    this.hotelModelPost = new Hotel('','', '','', '', '',0,'');
    this.hotelModelGetId = new Hotel('','', '','', '', '',0,'');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getHoteles();
  }

  getHoteles(){
    this._hotelesService.obtenerHoteles().subscribe(
      (response) => {
        this.hotelModelGet = response.hoteles;
        console.log(response);
        console.log(this.hotelModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getHotelId(idHotel){
    this._hotelesService.obtenerHotelId(idHotel, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.hotelModelGetId = response.hoteles;
        console.log(response);
        console.log(this.hotelModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postHoteles(addForm){
    this._hotelesService.agregarHotel(this.hotelModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getHoteles();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado el Hotel Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar el nuevo Hotel.</a>'
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

  putHoteles(){
    this._hotelesService.editarHotel(this.hotelModelGetId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getHoteles();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en el Hotel',
          text: '¡Puedes Revisar el Hotel Actualizado!',
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

  deleteHotel(idHotel) {
    this._hotelesService.eliminarHotel(idHotel, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getHoteles();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }
}


