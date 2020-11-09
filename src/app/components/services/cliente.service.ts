import {Injectable} from '@angular/core';
import {Cliente} from '../pages/clientes/cliente';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import {urlEndPointClients} from '../../../environments/environment';
import {catchError, map} from 'rxjs/operators';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

import {formatDate} from '@angular/common';
import {Region} from '../pages/clientes/region';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  // private isNotAuthorized(e): boolean {
  //   if (e.status == 401) {
  //     if(this.authService.isAuthenticated()){
  //       this.authService.logout();
  //     }
  //     this.router.navigate(['/login']);
  //     return true;
  //   }else if (e.status == 403) {
  //     swal.fire('Acceso no autorizado', `${this.authService.user.username} no tienes acceso a este recurso`, 'warning');
  //     this.router.navigate(['/clientes']);
  //     return true;
  //   }
  //   return false;
  // }


  constructor(private http: HttpClient, private router: Router) {
  }

  // private addAuthorizationHeader() {
  //   let token = this.authService.token;
  //   if (token != null) {
  //     return this.httpHeaders.append('Authorization', 'Bearer ' + token);
  //   } else {
  //     return this.httpHeaders;
  //   }
  //
  // }

  /**
   * Metodo para obtener todos las regiones
   */
  getRegiones(page: number): Observable<Region[]> { // Observable hace que el metodo sea asincrono
    return this.http.get<Region[]>(urlEndPointClients + '/regiones');

    // return of(CLIENTES);                // Convierte el listado clientes en un observable y por consiguiente en un stream
    return this.http.get<Cliente[]>(urlEndPointClients + '/page/' + page).pipe( // Hace una peticion get a la url para retornar un json que transforma en una lista de clientes
      map((response: any) => {

        (response.content as Cliente[]).map(cliente => {
            cliente.clientName = cliente.clientName.toUpperCase();  // Ponemos todos los nombres de los clientes en mayuscula
            cliente.lastName = cliente.lastName.toUpperCase();
            cliente.createAt = formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-US');
            return cliente;
          }
        );
        return response;
      }));
  }


  /**
   * Metodo para obtener todos los clientes
   */
  getClientes(page: number): Observable<any> { // Observable hace que el metodo sea asincrono
    // return of(CLIENTES);                // Convierte el listado clientes en un observable y por consiguiente en un stream
    return this.http.get<Cliente[]>(urlEndPointClients + '/page/' + page).pipe( // Hace una peticion get a la url para retornar un json que transforma en una lista de clientes
      map((response: any) => {
        (response.content as Cliente[]).map(cliente => {
            cliente.clientName = cliente.clientName.toUpperCase();  // Ponemos todos los nombres de los clientes en mayuscula
            cliente.lastName = cliente.lastName.toUpperCase();
            cliente.createAt = formatDate(cliente.createAt, 'dd/MM/yyyy', 'en-US');
            return cliente;
          }
        );
        return response;
      }));
  }

  /**
   * Metodo para crear un nuevo cliente
   *
   * @param cliente Cliente a crear
   */
  create(cliente: Cliente): Observable<any> {
    return this.http.post<any>(urlEndPointClients, cliente).pipe(
      catchError(e => {
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  /**
   * Metodo para obtener un solo cliente
   *
   * @param id ID del cliente a obtener
   */
  getCliente(id): Observable<any> {
    return this.http.get<Cliente>(`${urlEndPointClients}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/clientes']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }


  /**
   * Metodo para actualizar un cliente ya existente
   *
   * @param cliente Cliente a actualizar
   */
  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${urlEndPointClients}/${cliente.id}`, cliente).pipe(
      catchError(e => {
        if (e.status == 400) { // Error de formulario
          return throwError(e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }// Intercepta el observable en busca de fallos

  /**
   * Metodo para borrar un cliente
   *
   * @param id ID del cliente a borrar
   */
  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${urlEndPointClients}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  uploadPhoto(archivo: File, id): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('file', archivo);
    formData.append('id', id);
    const req = new HttpRequest('POST', `${urlEndPointClients}/upload`, formData, {
      reportProgress: true,
    });
    return this.http.request(req);
  }


}
