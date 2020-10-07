import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/share/header/header.component';
import { FooterComponent } from './components/share/footer/footer.component';
import { DirectivaComponent } from './components/pages/directiva/directiva.component';
import {CommonModule} from '@angular/common';
import { ClientesComponent } from './components/pages/clientes/clientes.component';
import {ClienteService} from './components/services/cliente.service';
import {AppRoutingModule} from './app-routing.module';
import {HttpClientModule} from '@angular/common/http';
import { FormComponent } from './components/pages/form/form.component';
import {FormsModule} from '@angular/forms';
import { PaginatorComponent } from './components/pages/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ProfileComponent} from './components/pages/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule
  ],
  providers: [ClienteService, { provide: MAT_DATE_LOCALE, useValue: 'es' }],
  bootstrap: [AppComponent]
})
export class AppModule { }
