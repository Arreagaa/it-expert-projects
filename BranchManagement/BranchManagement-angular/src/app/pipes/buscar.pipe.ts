import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(productos:any, buscar:any) {
    if(buscar == undefined){
      return productos;
    }else{
      return productos.filter(productos =>{
        return productos.nombreProducto.toLowerCase().includes(buscar.toLowerCase()) || productos.nombreProveedor.toLowerCase().includes(buscar.toLowerCase())
        //|| productos.stock.includes(buscar)
      })
    }
  }

}
