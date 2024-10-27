import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Hotel } from '../models/hotel.model';

@Injectable({
  providedIn: 'root'
})
export class HotelesService {
  public url: String = 'https://controlhoteles-grupo7.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerHoteles(): Observable<any> {
    //let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })
    return this._http.get(this.url + '/obtenerHoteles', { headers: this.headersVariable })
  }

  agregarHotel(hotelModel: Hotel, token): Observable<any> {
    let parametros = JSON.stringify(hotelModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/registrarHotel', parametros, {headers: headersToken})
  }

  obtenerHotelId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerHotelId/' + id, {headers: headersToken})
  }

  editarHotel(hotelModel: Hotel, token): Observable<any> {
    let parametros = JSON.stringify(hotelModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarHotel/' + hotelModel._id, parametros, { headers: headersToken })
  }

  eliminarHotel(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarHotel/' + id, { headers: headersToken })
  }

}
