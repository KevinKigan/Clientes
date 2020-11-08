import { Injectable } from '@angular/core';
import {urlEndPointFacturas} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Factura} from '../../facturas/models/factura';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPointFacturas: string = urlEndPointFacturas;

  constructor(private http: HttpClient, ) { }

  getFactura(id:number):Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPointFacturas}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPointFacturas}/${id}`);
  }
}
