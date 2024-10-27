import { Component, OnInit } from '@angular/core';
import { ProductosSucursalService } from 'src/app/services/productos-sucursal.service';
//SUCURSALES
import { ProductosSucursal } from 'src/app/models/productosSucursal.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-productos-s',
  templateUrl: './productos-s.component.html',
  styleUrls: ['./productos-s.component.scss'],
  providers: [ ProductosSucursalService, UsuarioService ]
})
export class ProductosSComponent implements OnInit {

  public buscarPSucursal;

  chartOptions = {
    responsive: true,
  };
  //Nombres productos
  chartLabels:any = [];
  //cantidad de producto
  chartData:any = [];
  chartColors:any = [
    {
      backgroundColor: []
    }
  ];
  chartLegend = true;
  chartPlugins = [];


  public token;
  public idSucursal;
  public productoSucursalModelId=[];

  //SUCURSALES
  public productoSucursalModelGet: ProductosSucursal;
  public productoSucursalModelPost: ProductosSucursal;
  public productoSucursalModeGetlId: ProductosSucursal;

  constructor(private _productosSucursalService: ProductosSucursalService, public _usuarioService: UsuarioService,
    public _activatedRoute: ActivatedRoute) {
    this.productoSucursalModelPost = new ProductosSucursal('','',0,'',0,'','');
    this.productoSucursalModeGetlId = new ProductosSucursal('','',0,'',0,'','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      this.getSucursales(dataRuta.get('idSucursal'));

      this.idSucursal = dataRuta.get('idSucursal')
    })
    //this.getSucursales();
  }

  getSucursales(idSucursal){
    this.productoSucursalModelId = [];
    this._productosSucursalService.obtenerProductosSucursal(idSucursal, this.token).subscribe(
      (response) => {
        this.productoSucursalModelId = response.productosSucursal;
        console.log(response.productosSucursal);
        console.log(this.productoSucursalModelId);
        this.putGrafica(this.productoSucursalModelId)
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  putGrafica(dato){
    this.chartData = [];
    this.chartLabels = [];

    this.productoSucursalModelId.forEach(dato => {
      this.chartLabels.push(dato.nombreProductoSucursal);
      this.chartData.push(dato.cantidadVendida);
      this.chartColors[0].backgroundColor.push(`#${ Math.floor(Math.random()*16777215).toString(16)}`);
      console.log(this.productoSucursalModelId);
    });

  }

  getProductosEmpresaId(idSucursal){
    this._productosSucursalService.obtenerProductosSucursalId(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productoSucursalModeGetlId = response.productosSucursal;
        console.log(response);
        console.log(this.productoSucursalModeGetlId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getProductosStockSucursal(){
    this._productosSucursalService.obtenerStockProductosSucursal(this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productoSucursalModelId = response.productosSucursal;

        console.log(response);
        console.log(this.productoSucursalModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getProductosStockSucursalMenor(){
    this._productosSucursalService.obtenerStockProductosSucursalMenor(this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productoSucursalModelId = response.productosSucursal;

        console.log(response);
        console.log(this.productoSucursalModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  putProductosSucursal(){
    this._productosSucursalService.editarProductosSucursal(this.productoSucursalModeGetlId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getSucursales(this.idSucursal.idSucursal);
        this.getSucursales(this.idSucursal)
        //this.getSucursales();
        Swal.fire({
          icon: 'success',
          title: 'Se han realizado una Venta exitosamente',
          text: '¡Puedes Revisar la Cantidad Vendida!',
          footer: 'Función concretada correctamente.'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡La cantidad a vender es mucho mayor al Stock disponible!',
          footer: 'No dejes campos vacios, ¡gracias!'
        })
      }
    )
  }

}
