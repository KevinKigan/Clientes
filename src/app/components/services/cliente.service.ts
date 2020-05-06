import { Injectable } from '@angular/core';
import {Cliente} from '../pages/clientes/cliente';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndPoint: string = "http://localhost:8080/api/clientes";
  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]>{ // Observable hace que el metodo sea asincrono
    // return of(CLIENTES);                // Convierte el listado clientes en un observable y por consiguiente en un stream
    return this.http.get<Cliente[]>(this.urlEndPoint); // Hace una peticion get a la url para retornar un json que transforma en una lista de clientes
  }

  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint, cliente, {headers: this.httpHeaders});
  }
}
