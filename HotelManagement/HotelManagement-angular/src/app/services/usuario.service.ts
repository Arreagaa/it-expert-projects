import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public headersToken = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': this.obtenerToken()
  })

  public url: String = 'https://controlhoteles-grupo7.herokuapp.com/api';
  public headersVariable = new HttpHeaders().set('Content-Type', 'application/json');
  public identidad;
  public token;

  constructor(public _http: HttpClient) { }

  login(usuario, obtenerToken = null): Observable<any> {
    if(obtenerToken != null){
      usuario.obtenerToken = obtenerToken;
    }

    let params = JSON.stringify(usuario);

    return this._http.post(this.url + '/login', params, {headers: this.headersVariable});
  }

  obtenerToken(){
    var token2 = localStorage.getItem("token");
    if(token2 != undefined){
      this.token = token2;
    } else {
      this.token = '';
    }

    return this.token;
  }

  obtenerIdentidad(){
    var identidad2 = JSON.parse(localStorage.getItem('identidad'));
    if(identidad2 != undefined){
      this.identidad = identidad2;
    } else {
      this.identidad = null;
    }

    return this.identidad;
  }

  agregarUsuario(modeloUsuario: Usuario): Observable<any> {
    let parametros = JSON.stringify(modeloUsuario);

    return this._http.post(this.url + '/registrarCliente', parametros, {headers: this.headersVariable})
  }

  obtenerClientes(token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token)

    return this._http.get(this.url + '/obtenerClientes', { headers: headersToken })
  }

  obtenerClienteId(id:String, token): Observable<any>{
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.get(this.url + '/obtenerClienteId/' + id, {headers: headersToken})
  }

  updateUser(id, params, token){
    let headersToken = this.headersVariable.set('Authorization', token);
    return this._http.put(this.url + '/editarClientePerfil/'+ id, params, {headers: headersToken});
  }

  deleteUser(id, params, token): Observable<any> {
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.delete(this.url + '/eliminarClientePerfil/' + id, { headers: headersToken })
  }

  /*ADMINISTRACION USUARIOS*/
  editarClientes(modeloUsuario: Usuario, token): Observable<any> {
    let parametros = JSON.stringify(modeloUsuario);
    let headersToken = this.headersVariable.set('Authorization', token);

    return this._http.put(this.url + '/editarClienteRol/' + modeloUsuario._id, parametros, { headers: headersToken })
  }

}
