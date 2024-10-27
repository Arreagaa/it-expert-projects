import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SucursalesComponent } from './components/sucursales/sucursales.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { EmpresaComponent } from './components/empresa/empresa.component';
import { ProductosEComponent } from './components/productos-e/productos-e.component';
import { VerEmpresaComponent } from './components/ver-empresa/ver-empresa.component';
import { ProductosSComponent } from './components/productos-s/productos-s.component';
import { DashboardInicioComponent } from './components/dashboard-inicio/dashboard-inicio.component';
//import { GraficaComponent } from './components/grafica/grafica.component';
import { ChartsModule } from '@rinminase/ng-charts';
import { BuscarPipe } from './pipes/buscar.pipe';
import { BuscarPSucursalPipe } from './pipes/buscar-psucursal.pipe';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    RegistroComponent,
    DashboardComponent,
    NavbarComponent,
    SucursalesComponent,
    EmpresaComponent,
    ProductosEComponent,
    VerEmpresaComponent,
    ProductosSComponent,
    DashboardInicioComponent,
    BuscarPipe,
    BuscarPSucursalPipe,
    //GraficaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
