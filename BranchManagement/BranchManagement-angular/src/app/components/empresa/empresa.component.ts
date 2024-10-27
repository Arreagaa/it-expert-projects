import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
//EMPRESA
import { Empresa } from 'src/app/models/empresas.model';
import { EmpresasService } from 'src/app/services/empresas.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-empresas',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.scss'],
  providers: [ EmpresasService, UsuarioService ]
})
export class EmpresaComponent implements OnInit {

  public token;

  //Empresa
  public empresaModelGet: Empresa;
  public empresaModelPost: Empresa;
  public empresaModelId: Empresa;

  constructor(private _empresaService: EmpresasService, private _usuarioService: UsuarioService) {
    this.empresaModelPost = new Empresa('','', '','', '', '','');
    this.empresaModelId = new Empresa('','','','','','','');
    this.token = this._usuarioService.obtenerToken();
  }

  ngOnInit(): void {
    this.getEmpresas();
  }

  getEmpresas(){
    this._empresaService.obtenerEmpresas(this.token).subscribe(
      (response) => {
        this.empresaModelGet = response.usuarios;
        console.log(response);
        console.log(this.empresaModelGet);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  getEmpresaId(idEmpresa){
    this._empresaService.obtenerEmpresaId(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        this.empresaModelId = response.usuarios;
        console.log(response);
        console.log(this.empresaModelId);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

  postEmpresas(addForm){
    this._empresaService.agregarEmpresa(this.empresaModelPost, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
        addForm.reset();
        Swal.fire({
          icon: 'success',
          title: 'Se ha agregado la Empresa Correctamente',
          text: '¡Puedes Revisar el cambio!',
          footer: '<a>Puedes revisar la nueva Empresa.</a>'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: '<a>No dejes campos vacios, ¡gracias!</a>'
        })
      }
    )
  }

  deleteEmpresa(idEmpresa) {
    this._empresaService.eliminarEmpresa(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
      },
      (error)=>{
        console.log(<any>error);

      }
    )
  }

  putEmpresa(){
    this._empresaService.editarEmpresa(this.empresaModelId, this._usuarioService.obtenerToken()).subscribe(
      (response)=>{
        console.log(response);
        this.getEmpresas();
        Swal.fire({
          icon: 'warning',
          title: 'Se han realizado cambios en la Empresa',
          text: '¡Puedes Revisar la Empresa Actualizada!',
          footer: '<a>Función concretada correctamente.</a>'
        })
      },
      (error)=>{
        console.log(<any>error);
        Swal.fire({
          icon: 'warning',
          title: 'Algo no anda bien...',
          text: '¡Revisa que la información este correcta!',
          footer: 'No dejes campos vacios, ¡gracias!'
        })
      }
    )
  }
}
