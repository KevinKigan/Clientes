import { Injectable } from '@angular/core';
import {Cliente} from '../pages/clientes/cliente';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {urlEndPoint} from '../../../environments/environment';
import {catchError} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private httpHeaders = new HttpHeaders({'Content-type':'application/json'});

  constructor(private http: HttpClient, private router: Router) { }

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
  create(cliente: Cliente):Observable<any>{
    return this.http.post<any>(urlEndPoint, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para obtener un solo cliente
   *
   * @param id ID del cliente a obtener
   */
  getCliente(id): Observable<any>{
    return this.http.get<Cliente>(`${urlEndPoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al obtener cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }


  /**
   * Metodo para actualizar un cliente ya existente
   *
   * @param cliente Cliente a actualizar
   */
  update(cliente: Cliente): Observable<any>{
    return this.http.put<any>(`${urlEndPoint}/${cliente.id}`, cliente, {headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al editar el cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }// Intercepta el observable en busca de fallos

  /**
   * Metodo para borrar un cliente
   *
   * @param id ID del cliente a borrar
   */
  delete(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${urlEndPoint}/${id}`,{headers: this.httpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire('Error al eliminar cliente', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }
}
