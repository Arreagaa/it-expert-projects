import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//EMPRESA
import { Hotel } from 'src/app/models/hotel.model';
import { HotelesService } from 'src/app/services/hoteles.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-dashboard-hoteles',
  templateUrl: './dashboard-hoteles.component.html',
  styleUrls: ['./dashboard-hoteles.component.scss'],
  providers: [ HotelesService, UsuarioService ]
})
export class DashboardHotelesComponent implements OnInit {

  public token;
  public buscar;

  //Hotel
  public hotelModelGet: Hotel;

  constructor(private _hotelesService: HotelesService, public _usuarioService: UsuarioService) {
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
}


