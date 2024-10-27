import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import {EmpresaComponent} from './components/empresa/empresa.component';
import { ProductosEComponent } from './components/productos-e/productos-e.component';
import { VerEmpresaComponent } from './components/ver-empresa/ver-empresa.component';
import { ProductosSComponent } from './components/productos-s/productos-s.component';
import { DashboardInicioComponent } from './components/dashboard-inicio/dashboard-inicio.component';
import { EmpresaGuard } from './services/empresa.guard';
import { AdministradorGuard } from './services/administrador.guard';

//aqui se importan los componentes
/*const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Inicio', component: InicioComponent},
  {path: 'Registro', component: RegistroComponent},
  {path: 'Dashboard/:idEmpresa', component: DashboardComponent},
  {path: 'Dashboard', component: DashboardComponent},
  {path: 'Sucursales', component: SucursalesComponent},
  {path: 'Empresa', component: EmpresaComponent},
  {path:'productoE', component:ProductosEComponent},
  {path:'verEmpresa/:idEmpresa', component:VerEmpresaComponent},
  {path:'productoS/:idSucursal',component: ProductosSComponent},
  {path: 'DashboardInicio', component: DashboardInicioComponent},
];*/

const routes: Routes = [
  {path: 'Login', component: LoginComponent},
  {path: 'Registro', component: RegistroComponent},
  {path: 'DashboardInicio', component: DashboardInicioComponent},
  {path: 'Inicio', component: InicioComponent},

  {
    path: 'Empresa', canActivate: [EmpresaGuard], children:[
      {path: 'Inicio', component: InicioComponent},
      {path: 'Dashboard', component: DashboardComponent},
      {path:'productoE', component:ProductosEComponent},
      {path:'productoS/:idSucursal',component: ProductosSComponent}
    ]
  },
  {
    path: 'Admin', canActivate: [AdministradorGuard], children:[
      {path: 'Inicio', component: InicioComponent},
      {path: 'Empresa', component: EmpresaComponent},
      {path: 'Dashboard/:idEmpresa', component: DashboardComponent},

    ]
  },
  { path: "**", component: LoginComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
