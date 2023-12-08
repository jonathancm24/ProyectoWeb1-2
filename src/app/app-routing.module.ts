import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent } from "./components/login/login.component"
import {RegistroComponent} from "./components/registro/registro.component"
import {InicioComponent} from "./components/inicio/inicio.component"
import {PaginaNoEncontradaComponent} from "./components/pagina-no-encontrada/pagina-no-encontrada.component"
import { PracticasComponent } from './components/practicas/practicas.component';
import { ActividadesComponent } from './components/actividades/actividades.component';
import { HomeComponent } from './components/home/home.component';
import { PlanillaComponent } from './components/planilla/planilla.component';
//Iniciar Server comando : ng serve

const routes: Routes = [
  {path: '', redirectTo: 'Login', pathMatch: 'full'},
  {path:"Login" , component:LoginComponent},
  {path:"Registro", component:RegistroComponent},
  {path:"Inicio", component:InicioComponent,
  children:[
    {path:"Home" , component:HomeComponent},
    {path:"Practicas" , component:PracticasComponent},
    {path:"Actividades" , component:ActividadesComponent},
    {path:"Planilla" , component:PlanillaComponent},


  ]
  },
  { path: '**', component: PaginaNoEncontradaComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
