import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Evento } from '../models/evento.model';

@Injectable({
  providedIn: 'root'
})
export class EventoService {
  public url: String = 'https://controlhoteles-grupo7.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerEventos(id:String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    //return this._http.get(this.url + '/obtenerHoteles', { headers: headersToken })
    return this._http.get(this.url + '/obtenerEventos/' +id, { headers: headersToken })
  }

  agregarEvento(EventoModel: Evento, token): Observable<any> {
    let parametros = JSON.stringify(EventoModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/agregarEvento', parametros, {headers: headersToken})
  }

  obtenerEventoId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerEventoId/' + id, {headers: headersToken})
  }

  editarEvento(EventoModel: Evento, token): Observable<any> {
    let parametros = JSON.stringify(EventoModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarEvento/' + EventoModel._id, parametros, { headers: headersToken })
  }

  eliminarEvento(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarEvento/' + id, { headers: headersToken })
  }

  comprarEvento(id:String, EventoModel: Evento, token): Observable<any> {
    let parametros = JSON.stringify(EventoModel);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/comprarEvento/' + id, parametros, {headers: headersToken})
  }

}

