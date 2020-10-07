import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DirectivaComponent} from './components/pages/directiva/directiva.component';
import {ClientesComponent} from './components/pages/clientes/clientes.component';
import {FormComponent} from './components/pages/form/form.component';


const app_routes: Routes = [
  {path: 'home', redirectTo: '/clientes', pathMatch:'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent},
  {path: 'clientes/form/:id', component: FormComponent}
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
