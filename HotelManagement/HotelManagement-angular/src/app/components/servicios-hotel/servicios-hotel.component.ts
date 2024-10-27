import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//HOTELES
import { Hotel } from 'src/app/models/hotel.model';
import { HotelesService } from 'src/app/services/hoteles.service';
import { ActivatedRoute } from '@angular/router';
//HABITACIONES

@Component({
  selector: 'app-servicios-hotel',
  templateUrl: './servicios-hotel.component.html',
  styleUrls: ['./servicios-hotel.component.scss'],
  providers: [ HotelesService, UsuarioService ]
})
export class ServiciosHotelComponent implements OnInit {

  public token;
  public idHotel;

  //DATOS DEL HOTEL
  public hotelModelGet: Hotel;
  public hotelModelGetId: Hotel;

  constructor(private _hotelesService: HotelesService, public _usuarioService: UsuarioService, public _activatedRoute: ActivatedRoute) {
    this.hotelModelGetId = new Hotel('','', '','', '', '',0,'');
    this.token = this._usuarioService.obtenerToken();
  }
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getHotelId(dataRuta.get('idHotel'));

      this.idHotel = dataRuta.get('idHotel')
    })
  }

  //OBTENER DATOS DEL HOTEL POR SU ID
  getHotelId(idHotel){
    this._hotelesService.obtenerHotelId(idHotel, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.hotelModelGetId = response.hoteles;
        console.log(response.hoteles);
        console.log(response);
        console.log(this.hotelModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

}
