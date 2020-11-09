import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DirectivaComponent} from './components/pages/directiva/directiva.component';
import {ClientesComponent} from './components/pages/clientes/clientes.component';
import {FormComponent} from './components/pages/form/form.component';
import {LoginComponent} from './components/users/login.component';
import {AuthGuard} from './components/users/guards/auth.guard';
import {RoleGuard} from './components/users/guards/role.guard';
import {FacturaDetailComponent} from './components/factura/factura-detail.component';
import {FacturaComponent} from './components/factura/factura.component';
import {HomeRedirectComponent} from './components/home-redirect/home-redirect.component';


const app_routes: Routes = [
  {path: 'home', component: HomeRedirectComponent},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'clientes/form/:id', component: FormComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ROLE_ADMIN'}},
  {path: 'login', component: LoginComponent},
  {path: 'facturas/:id', component: FacturaDetailComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ROLE_USER'}},
  {path: 'facturas/form/:clienteId', component: FacturaComponent, canActivate:[AuthGuard, RoleGuard], data:{role:'ROLE_ADMIN'}},
];


@NgModule ({
  imports: [
    RouterModule.forRoot(app_routes, {useHash: true})
  ],
  exports:[
    RouterModule
  ]

})
export class AppRoutingModule{ }
