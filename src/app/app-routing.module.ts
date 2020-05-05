import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {DirectivaComponent} from './components/pages/directiva/directiva.component';
import {ClientesComponent} from './components/pages/clientes/clientes.component';


const app_routes: Routes = [
  {path: 'home', redirectTo: '/clientes', pathMatch:'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent}
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
