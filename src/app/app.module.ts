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
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { FormComponent } from './components/pages/form/form.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { PaginatorComponent } from './components/pages/paginator/paginator.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {ProfileComponent} from './components/pages/clientes/profile/profile.component';
import { LoginComponent } from './components/users/login.component';
import {TokenInterceptor} from './components/users/interceptors/token.interceptor';
import {AuthInterceptor} from './components/users/interceptors/auth.interceptor';
import { FacturaDetailComponent } from './components/factura/factura-detail.component';
import { FacturaComponent } from './components/factura/factura.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    DirectivaComponent,
    ClientesComponent,
    FormComponent,
    PaginatorComponent,
    ProfileComponent,
    LoginComponent,
    FacturaDetailComponent,
    FacturaComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [ClienteService, { provide: MAT_DATE_LOCALE, useValue: 'es' },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor,  multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
