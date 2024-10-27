import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2'
//HOTELES
import { Hotel } from 'src/app/models/hotel.model';
import { HotelesService } from 'src/app/services/hoteles.service';
//RESERVACIONES
import { Reservacion } from 'src/app/models/reservacion.model';
import { ReservacionService } from 'src/app/services/reservacion.service';
import { faDownload } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-reservaciones-hotel',
  templateUrl: './reservaciones-hotel.component.html',
  styleUrls: ['./reservaciones-hotel.component.scss'],
  providers: [ HotelesService, UsuarioService, ReservacionService]

})
export class ReservacionesHotelComponent implements OnInit {

  public token;
  public idHotel;
  public buscarCliente;

  //RESERVACION
  public reservacionModelGet: Reservacion;
  public reservacionlModelPost: Reservacion;
  public reservacionModelGetId: Reservacion;

  constructor(private _hotelesService: HotelesService, public _usuarioService: UsuarioService,
    public _reservacionService: ReservacionService,  public _activatedRoute: ActivatedRoute,) {

    //RESERVACIONES
    this.reservacionlModelPost = new Reservacion('','','','','',0);
    this.reservacionModelGetId = new Reservacion('','','','','',0);
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getReservaciones(dataRuta.get('idHotel'));

      this.idHotel = dataRuta.get('idHotel')
    });

  }

  //RESERVACION

  getReservaciones(idHotel){
    this._reservacionService.obtenerReservacionesHotel(idHotel,this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.reservacionModelGet = response.reservaciones;
        console.log(response);
        console.log(this.reservacionModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getReservaPdf(){
    this._reservacionService.obtenerRervacionesReporte(this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.reservacionModelGet = response.reservaciones;
        console.log(response);
        console.log(this.reservacionModelGet);
        this.getReservaciones(this.idHotel)
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

}
