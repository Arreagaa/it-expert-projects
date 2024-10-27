import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Sucursales } from '../models/sucursales.model';

@Injectable({
  providedIn: 'root'
})
export class SucursalesService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerSucursales(idEmpresa, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/obtenerSucurales/' + idEmpresa, { headers: headersToken })
    //return this._http.get(this.url + '/obtenerEmpresas', { headers: this.headersVariable })
  }

  agregarSucursal(modeloSucursales: Sucursales, token): Observable<any> {
    let parametros = JSON.stringify(modeloSucursales);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/agregarSucursal', parametros, {headers: headersToken})
  }

  eliminarSucursal(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarSucursal/' + id, { headers: headersToken })
  }

  obtenerSucursalId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/ObtenerSucursalId/' + id, {headers: headersToken})
  }

  editarEmpresa(modeloSucursales: Sucursales, token): Observable<any> {
    let parametros = JSON.stringify(modeloSucursales);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarSucursal/' + modeloSucursales._id, parametros, { headers: headersToken })
  }

}
