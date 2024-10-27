import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscar'
})
export class BuscarPipe implements PipeTransform {

  transform(hotel:any, buscar:any) {
    if(buscar == undefined){
      return hotel;
    }else{
      return hotel.filter(hotel =>{
        return hotel.nombreHotel.toLowerCase().includes(buscar.toLowerCase()) || hotel.direccion.toLowerCase().includes(buscar.toLowerCase()) ||
        hotel.pais.toLowerCase().includes(buscar.toLowerCase())
      })
    }
  }

}
