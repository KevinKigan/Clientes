import { Injectable } from '@angular/core';
import {urlEndPointFacturas, urlEndPointFacturasFilteredProducts} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Factura} from '../../facturas/models/factura';
import {Product} from '../../facturas/models/product';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private urlEndPointFacturas: string = urlEndPointFacturas;
  private urlEndPointFacturasFilteredProducts: string = urlEndPointFacturasFilteredProducts;

  constructor(private http: HttpClient, ) { }

  getFactura(id:number):Observable<Factura>{
    return this.http.get<Factura>(`${this.urlEndPointFacturas}/${id}`);
  }

  delete(id: number): Observable<void>{
    return this.http.delete<void>(`${this.urlEndPointFacturas}/${id}`);
  }
  getFilteredProducts(term:string):Observable<Product[]>{
    return this.http.get<Product[]>(`${this.urlEndPointFacturasFilteredProducts}/${term}`);
  }

  create(factura: Factura):Observable<Factura>{
    return this.http.post<Factura>(this.urlEndPointFacturas, factura);
  }
}
