import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductosEmpresaService } from 'src/app/services/productos-empresa.service';
import { ProductosEmpresa } from 'src/app/models/productosEmpresa.model';
import { ProductosSucursal } from 'src/app/models/productosSucursal.model';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-productos-e',
  templateUrl: './productos-e.component.html',
  styleUrls: ['./productos-e.component.scss'],
  providers: [ ProductosEmpresaService, UsuarioService ]
})
export class ProductosEComponent implements OnInit {

  public token;
  public buscar;

  //PRODUCTOS DE LA EMPRESA
  public productosEmpresaModelGet: ProductosEmpresa;
  public productosEmpresaModelPost: ProductosEmpresa;
  public productosSucursalModelPost: ProductosSucursal;
  public productosEmpresaModelId: ProductosEmpresa;

  constructor(private _productosEmpresaService: ProductosEmpresaService, private _usuarioService: UsuarioService) {
    this.productosEmpresaModelPost = new ProductosEmpresa('','', '',0, '');
    this.productosEmpresaModelId = new ProductosEmpresa('','','',0, '');
    this.productosSucursalModelPost = new ProductosSucursal('','',0,'',0, '','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getProductosEmpresa();
  }

  getProductosEmpresa(){
    this._productosEmpresaService.obtenerProductosEmpresa(this.token).subscribe(
      (response) => {
        this.productosEmpresaModelGet = response.productos;
        console.log(response);
        console.log(this.productosEmpresaModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getProductosEmpresaId(idSucursal){
    this._productosEmpresaService.obtenerProductosEmpresaId(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productosEmpresaModelId = response.productos;
        console.log(response);
        console.log(this.productosEmpresaModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  sendProductosEmpresa(sendForm){
    this._productosEmpresaService.enviarProductosSucursal(this.productosSucursalModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductosEmpresa();
        sendForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se han Enviada Productos a Sucursal',
          text: '¡Puedes Revisar el cambio!',
          footer: 'Envió de Producto Exitoso.'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡La cantidad a mandar es mucho mayor al Stock!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>'
        })
      }
    )
  }

  postProductosEmpresa(addForm){
    this._productosEmpresaService.agregarProductoEmpresa(this.productosEmpresaModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductosEmpresa();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado un Producto Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: 'Puedes revisar el nuevo Producto.'
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

  deleteProductosEmpresa(idSucursal) {
    this._productosEmpresaService.eliminarProductosEmpresa(idSucursal, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductosEmpresa();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  putProductosEmpresa(){
    this._productosEmpresaService.editarProductosEmpresa(this.productosEmpresaModelId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getProductosEmpresa();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en el Producto',
          text: '¡Puedes Revisar el Producto Actualizado!',
          footer: 'Función concretada correctamente.'
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

  getProductosStockEmpresa(){
    this._productosEmpresaService.obtenerStockProductoEmpresa(this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productosEmpresaModelGet = response.productos;

        console.log(response);
        console.log(this.productosEmpresaModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getProductosStockEmpresaMenor(){
    this._productosEmpresaService.obtenerStockProductosEmpresaMenor(this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.productosEmpresaModelGet = response.productos;

        console.log(response);
        console.log(this.productosEmpresaModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

}
