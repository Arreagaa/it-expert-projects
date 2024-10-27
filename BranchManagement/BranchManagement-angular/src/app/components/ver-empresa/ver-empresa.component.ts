import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmpresasService } from 'src/app/services/empresas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-ver-empresa',
  templateUrl: './ver-empresa.component.html',
  styleUrls: ['./ver-empresa.component.scss'],
  providers: [EmpresasService, UsuarioService]
})
export class VerEmpresaComponent implements OnInit {

  constructor(
    public _activatedRoute: ActivatedRoute,
    public _empresaService: EmpresasService,
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta)=>{
      console.log(dataRuta.get('idEmpresa'));
      this.getEmpresaId(dataRuta.get('idEmpresa'));
    })
  }

  getEmpresaId(idEmpresa){
    this._empresaService.obtenerEmpresaId(idEmpresa, this._usuarioService.obtenerToken()).subscribe(
      (response) => {
        console.log(response);
      },
      (error)=>{
        console.log(<any>error)
      }
    )
  }

}
