import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FacturaRegistroService } from 'src/app/services/factura-registro.service';
import { ActivatedRoute } from '@angular/router';
import { Registro } from 'src/app/models/registro.model';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-factura-historial',
  templateUrl: './factura-historial.component.html',
  styleUrls: ['./factura-historial.component.scss'],
  providers: [UsuarioService,FacturaRegistroService]
})
export class FacturaHistorialComponent implements OnInit {

  public token
  public identidad;
  public RegistroModelGet: Registro;
  public precioTotal: Number = 0;

  constructor(public _activatedRoute: ActivatedRoute,
    public _usuarioService: UsuarioService,
    public _registroService: FacturaRegistroService) {

    this.RegistroModelGet = new Registro('','',0,0,'');
    this.token = this._usuarioService.obtenerToken();
    this.identidad = this._usuarioService.obtenerIdentidad();
    }

  ngOnInit(): void {

    this.getFactura();
  }

  getFactura(){
    this._registroService.ObtenerRegistro(this.token).subscribe({
      next: (response: any) => {
        this.RegistroModelGet = response.Registro;
        this.total(this.RegistroModelGet)
      },
      error: (err) => {
        console.log(err)
      },
    });
  }

  total(precios){
    for(let i=0; i<precios.length; i++){
      this.precioTotal = this.precioTotal + precios[i].precio;
    }
  }

  deleteRegistro(registro) {
    this._registroService.EliminarRegistro(registro, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getFactura();
        Swal.fire({
          icon: 'success',
          title: 'Se ha cancelado la Reservacion Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes verificar, vuelve pronto.</a>'
        })
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

}
