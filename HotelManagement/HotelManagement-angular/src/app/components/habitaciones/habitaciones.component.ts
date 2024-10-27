import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2'
//HOTELES
import { Hotel } from 'src/app/models/hotel.model';
import { HotelesService } from 'src/app/services/hoteles.service';
import { ActivatedRoute } from '@angular/router';
//HABITACIONES
import { Room } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';
//EVENTOS
import { Evento } from 'src/app/models/evento.model';
import { EventoService } from 'src/app/services/eventos.service';
//SERVICIOS
import { Servicio } from 'src/app/models/servicio.model';
import { ServicioService } from 'src/app/services/servicios.service';

//RESERVACIONES
import { Reservacion } from 'src/app/models/reservacion.model';
import { ReservacionService } from 'src/app/services/reservacion.service';

@Component({
  selector: 'app-habitaciones',
  templateUrl: './habitaciones.component.html',
  styleUrls: ['./habitaciones.component.scss'],
  providers: [ HotelesService, UsuarioService, RoomService, ServicioService, ReservacionService]
})
export class HabitacionesComponent implements OnInit {

  public token;
  public idHotel;
  public idRoom;
  public idServicio;
  public idEvento;

  //DATOS DEL HOTEL
  public hotelModelGet: Hotel;
  public hotelModelGetId: Hotel;

  //ROOMS
  public roomModelGet: Room;
  public roomlModelPost: Room;
  public roomModelGetId: Room;

  //SERVICIOS
  public servicioModelGet: Servicio;
  public servicioModelPost: Servicio;
  public servicioModelGetId: Servicio;

  //EVENTOS
  public eventoModelGet: Evento;
  public eventolModelPost: Evento;
  public eventoModelGetId: Evento;

  //RESERVACION
  public reservacionModelGet: Reservacion;
  public reservacionlModelPost: Reservacion;
  public reservacionModelGetId: Reservacion;

  constructor(private _hotelesService: HotelesService, public _usuarioService: UsuarioService, public _activatedRoute: ActivatedRoute, public _roomService : RoomService,
    public _eventoService: EventoService, public _servicioService: ServicioService, public _reservacionService: ReservacionService) {
    this.hotelModelGetId = new Hotel('','', '','', '', '',0,'');
    this.token = this._usuarioService.obtenerToken();

    //ROOMS
    this.roomlModelPost = new Room('','', '',0,true,'');
    this.roomModelGetId = new Room('','', '',0,true,'');

    //EVENTOS
    this.eventolModelPost = new Evento('','', '',0,true,this.idHotel);
    this.eventoModelGetId = new Evento('','', '',0,true,'');

    //SERVICIOS
    this.servicioModelPost = new Servicio('','',0,true,this.idHotel);
    this.servicioModelGetId = new Servicio('','',0,true,'');

    //RESERVACIONES
    this.reservacionlModelPost = new Reservacion('',this.idHotel,'','','',0);
    this.reservacionModelGetId = new Reservacion('','','','','',0);
  }
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getHotelId(dataRuta.get('idHotel'));

      this.idHotel = dataRuta.get('idHotel');
      this.reservacionlModelPost = new Reservacion('',this.idHotel,'','','',0);
      this.servicioModelPost = new Servicio('','',0,true,this.idHotel);
      this.eventolModelPost = new Evento('','', '',0,true,this.idHotel);
    });

    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getRooms(dataRuta.get('idHotel'));

      this.idHotel = dataRuta.get('idHotel')
    });

    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getServicios(dataRuta.get('idHotel'));

      this.idHotel = dataRuta.get('idHotel')
    });

    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getEventos(dataRuta.get('idHotel'));

      this.idHotel = dataRuta.get('idHotel')
    });

    this.getReserva();

  }

  //OBTENER DATOS DEL HOTEL POR SU ID
  getHotelId(idHotel){
    if(this._usuarioService.obtenerIdentidad().rol == 'ROL_CLIENTE'){
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

  //ROOMS DEL HOTEL

  getRooms(idHotel){
    this._roomService.obtenerRooms(idHotel,this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.roomModelGet = response.rooms;
        console.log(response);
        console.log(this.roomModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getRoomId(idRoom){
    this._roomService.obtenerRoomId(idRoom, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.roomModelGetId = response.rooms;
        console.log(response);
        console.log(this.roomModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postRooms(addForm){
    this._roomService.agregarRoom(this.roomlModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getRooms(this.idHotel);
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado la Habitación Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar la nueva Habitación.</a>'
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

  putRooms(){
    this._roomService.editarRoom(this.roomModelGetId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getRooms(this.idHotel);
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en la Habitación',
          text: '¡Puedes Revisar la Habitación Actualizada!',
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

  deleteRoom(idRoom) {
    this._roomService.eliminarRoom(idRoom, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getRooms(this.idHotel);
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  //SERVICIOS DEL HOTEL

  getServicios(idHotel){
    this._servicioService.obtenerServicios(idHotel,this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.servicioModelGet = response.servicios;
        console.log(response);
        console.log(this.servicioModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getServicioId(idServicio){
    this._servicioService.obtenerServicioId(idServicio, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.servicioModelGetId = response.servicios;
        console.log(response);
        console.log(this.servicioModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postServicios(addForm){
    this._servicioService.agregarServicio(this.servicioModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getServicios(this.idHotel);
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado el Servicio Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar el nuevo Servicio.</a>'
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

  postCompraServicio(addForm,idServicio){
    this._servicioService.comprarServicio(this.servicioModelGetId._id, this.servicioModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        console.log(this.idHotel);
        this.getServicios(this.idHotel);
        //this.getReserva();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha realizado la Compra Correctamente',
          text: '¡Gracias por confiar en nuestro Gran Hotel!',
          footer: '<a>Nos alegra tu próxima Visita.</a>'
        })
      },
      (error)=>{
        console.log(<any>error);
        console.log(this.servicioModelGetId._id);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>'
        })
      }
    )
  }

  putServicios(){
    this._servicioService.editarServicio(this.servicioModelGetId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getServicios(this.idHotel);
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en el Servicio',
          text: '¡Puedes Revisar el Servicio Actualizada!',
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

  deleteServicio(idServicio) {
    this._servicioService.eliminarServicio(idServicio, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getServicios(this.idHotel);
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  //EVENTOS DEL HOTEL

  getEventos(idHotel){
    this._eventoService.obtenerEventos(idHotel,this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.eventoModelGet = response.eventos;
        console.log(response);
        console.log(this.eventoModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getEventoId(idEvento){
    this._eventoService.obtenerEventoId(idEvento, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.eventoModelGetId = response.eventos;
        console.log(response);
        console.log(this.eventoModelGetId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postEventos(addForm){
    this._eventoService.agregarEvento(this.eventolModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEventos(this.idHotel);
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado el Evento Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar la nueva Evento.</a>'
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

  putEventos(){
    this._eventoService.editarEvento(this.eventoModelGetId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEventos(this.idHotel);
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en el Evento',
          text: '¡Puedes Revisar el Evento Actualizado!',
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

  deleteEvento(idEvento) {
    this._eventoService.eliminarEvento(idEvento, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEventos(this.idHotel);
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  postCompraEvento(addForm,idEvento){
    this._eventoService.comprarEvento(this.eventoModelGetId._id, this.eventolModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        console.log(this.idHotel);
        this.getEventos(this.idHotel);
        //this.getReserva();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha realizado la Compra Correctamente',
          text: '¡Gracias por confiar en nuestro Gran Hotel!',
          footer: '<a>Nos alegra tu próxima Visita.</a>'
        })
      },
      (error)=>{
        console.log(<any>error);
        console.log(this.servicioModelGetId._id);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>'
        })
      }
    )
  }

  //RESERVACION

  getReserva(){
    this._reservacionService.obtenerRervaciones(this._usuarioService.obtenerToken()).subscribe(
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

  getReservaId(idReservacion){
    this._reservacionService.obtenerRervacionId(idReservacion, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.reservacionModelGetId = response.reservaciones;
        console.log(response);
        console.log(this.reservacionModelGetId);
        console.log(response.reservaciones);
      },
      (error)=>{
        console.log(this.reservacionModelGetId);
        console.log(<any>error)
      }
    )
  }

  postReserva(addForm, idRoom){
    this._reservacionService.agregarReservacion(this.roomModelGetId._id, this.reservacionlModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        console.log(this.idHotel);
        this.getRooms(this.idHotel);
        this.getReserva();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha realizado la Reservación Correctamente',
          text: '¡Bienvenido a nuestro Gran Hotel!',
          footer: '<a>Nos alegra tu próxima Visita.</a>'
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

}
