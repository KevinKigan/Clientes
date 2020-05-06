import { Injectable } from '@angular/core';
import { CLIENTES } from '../../../assets/data/clientes.json';
import {Cliente} from '../pages/clientes/cliente';
import {Observable, of} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = "http://localhost:8080/api/clientes";

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{ // Observable hace que el metodo sea asincrono
    // return of(CLIENTES);                // Convierte el listado clientes en un observable y por consiguiente en un stream
    return this.http.get<Cliente[]>(this.urlEndPoint); // Hace una peticion get a la url para retornar un json que transforma en una lista de clientes
  }
}
