import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';
import { Reservacion } from '../models/reservacion.model';

@Injectable({
  providedIn: 'root'
})
export class ReservacionService {
  public url: String = 'https://controlhoteles-grupo7.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerRervaciones(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })
    return this._http.get(this.url + '/ObtenerReservaciones', { headers: headersToken })
  }

  agregarReservacion(id:String, reservacionModel: Reservacion, token): Observable<any> {
    let parametros = JSON.stringify(reservacionModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/reservacion/' + id, parametros, {headers: headersToken})
  }

  obtenerRervacionId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/ObtenerReservacionId/' + id, {headers: headersToken})
  }

  obtenerReservacionesHotel(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/obtenerReservacionesHotel/' + id, { headers: headersToken  })
  }

  obtenerRervacionesReporte(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })
    return this._http.get(this.url + '/makePDF', { headers: headersToken })
  }
}
