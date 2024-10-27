import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarCliente'
})
export class BuscarClientePipe implements PipeTransform {

  transform(reservaciones:any, buscar:any) {
    if(buscar == undefined){
      return reservaciones;
    }else{
      return reservaciones.filter(reservaciones =>{
        return reservaciones.idUsuario.toLowerCase().includes(buscar.toLowerCase()) || reservaciones.fechaInicio.toLowerCase().includes(buscar.toLowerCase()) /*||
        reservaciones.totalNoches.toLowerCase().includes(buscar.toLowerCase())*/
      })
    }
  }

}
