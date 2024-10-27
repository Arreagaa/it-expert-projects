import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { ProductosEmpresa } from '../models/productosEmpresa.model';
import { ProductosSucursal } from '../models/productosSucursal.model';


@Injectable({
  providedIn: 'root'
})
export class ProductosEmpresaService {
  public url: String = 'http://localhost:3000/api';
  public headersVariable = new HttpHeaders().set('Content-Type','application/json');

  constructor(public _http: HttpClient) { }

  obtenerProductosEmpresa(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/obtenerProductos', { headers: headersToken })
  }

  agregarProductoEmpresa(modeloProductosEmpresa: ProductosEmpresa, token): Observable<any> {
    let parametros = JSON.stringify(modeloProductosEmpresa);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/agregarProducto', parametros, {headers: headersToken})
  }

  eliminarProductosEmpresa(id : String, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarProducto/' + id, { headers: headersToken })
  }

  obtenerProductosEmpresaId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/obtenerProductosId/' + id, {headers: headersToken})
  }

  editarProductosEmpresa(modeloProductosEmpresa: ProductosEmpresa, token): Observable<any> {
    let parametros = JSON.stringify(modeloProductosEmpresa);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarProducto/' + modeloProductosEmpresa._id, parametros, { headers: headersToken })
  }

  enviarProductosSucursal(modeloProductosSucursal: ProductosSucursal, token): Observable<any> {
    let parametros = JSON.stringify(modeloProductosSucursal);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.post(this.url + '/enviarProducto', parametros, {headers: headersToken})
  }

  obtenerStockProductoEmpresa(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/buscarStockProducto', {headers: headersToken})
  }

  obtenerStockProductosEmpresaMenor(token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.get(this.url + '/buscarStockProductoMenor', {headers: headersToken})
  }
}
