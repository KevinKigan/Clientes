import { Injectable } from '@angular/core';
import { CLIENTES } from '../../../assets/data/clientes.json';
import {Cliente} from '../pages/clientes/cliente';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor() { }

  getClientes(): Observable<Cliente[]>{ // Observable hace que el metodo sea asincrono
    return of(CLIENTES);                // Convierte el listado clientes en un observable y por consiguiente en un stream
  }
}
