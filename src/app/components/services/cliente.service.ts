import { Injectable } from '@angular/core';
import {Cliente} from '../pages/clientes/cliente';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {urlEndPoint} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient) { }

  /**
   * Metodo para obtener todos los clientes
   */
  getClientes(): Observable<Cliente[]>{ // Observable hace que el metodo sea asincrono
    // return of(CLIENTES);                // Convierte el listado clientes en un observable y por consiguiente en un stream
    return this.http.get<Cliente[]>(urlEndPoint); // Hace una peticion get a la url para retornar un json que transforma en una lista de clientes
  }

  /**
   * Metodo para crear un nuevo cliente
   *
   * @param cliente Cliente a crear
   */
  create(cliente: Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(urlEndPoint, cliente, {headers: this.httpHeaders});
  }

  /**
   * Metodo para obtener un solo cliente
   *
   * @param id ID del cliente a obtener
   */
  getCliente(id): Observable<Cliente>{
    return this.http.get<Cliente>(`${urlEndPoint}/${id}`)
  }


  /**
   * Metodo para actualizar un cliente ya existente
   *
   * @param cliente Cliente a actualizar
   */
  update(cliente: Cliente): Observable<Cliente>{
    return this.http.put<Cliente>(`${urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders});
  }

  /**
   * Metodo para borrar un cliente
   *
   * @param id ID del cliente a borrar
   */
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${urlEndPoint}/${id}`,{headers: this.httpHeaders});
  }
}
