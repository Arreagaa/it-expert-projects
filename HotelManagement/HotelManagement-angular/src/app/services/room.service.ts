import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Room } from '../models/room.model';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  public url: String = 'https://controlhoteles-grupo7.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerRooms(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })headers: this.headersVariable
    return this._http.get(this.url + '/obtenerRooms/' + id, { headers: headersToken  })
  }

  agregarRoom(RoomModel: Room, token): Observable<any> {
    let parametros = JSON.stringify(RoomModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/agregarRoom', parametros, {headers: headersToken})
  }

  obtenerRoomId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerRoomId/' + id, {headers: headersToken})
  }

  editarRoom(RoomModel: Room, token): Observable<any> {
    let parametros = JSON.stringify(RoomModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarRoom/' + RoomModel._id, parametros, { headers: headersToken })
  }

  eliminarRoom(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarRoom/' + id, { headers: headersToken })
  }

}

