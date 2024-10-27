import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FacturaRegistroService {
  public url: String = 'https://controlhoteles-grupo7.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  ObtenerRegistro(token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtener', { headers: headersToken});
  }

  EliminarRegistro(registro, token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.delete(this.url + '/eliminarRegistro/' + registro, { headers: headersToken})
  }

}
