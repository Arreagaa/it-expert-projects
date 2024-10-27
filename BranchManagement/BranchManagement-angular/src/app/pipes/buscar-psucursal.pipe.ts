import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarPSucursal'
})
export class BuscarPSucursalPipe implements PipeTransform {

  transform(productos:any, buscar:any) {
    if(buscar == undefined){
      return productos;
    }else{
      return productos.filter(productos =>{
        return productos.nombreProductoSucursal.toLowerCase().includes(buscar.toLowerCase())
      })
    }
  }


}
