import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductosSucursal } from '../models/productosSucursal.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosSucursalService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerProductosSucursal(id: String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/buscarProductoSucursal/' + id, { headers: headersToken })

  }

  obtenerProductosSucursalId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerProductosSucursalId/' + id, {headers: headersToken})
  }

  editarProductosSucursal(modeloProductosSucursal: ProductosSucursal, token): Observable<any> {
    let parametros = JSON.stringify(modeloProductosSucursal);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/venta/' + modeloProductosSucursal.idSucursal, parametros, { headers: headersToken })
  }

  obtenerStockProductosSucursal(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/buscarStockProductoSucursal', {headers: headersToken})
  }

  obtenerStockProductosSucursalMenor(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/buscarStockProductoSucursalMenor', {headers: headersToken})
  }

}
