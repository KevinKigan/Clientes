import { Component, OnInit } from '@angular/core';
import {Factura} from '../../facturas/models/factura';
import {ClienteService} from '../services/cliente.service';
import {ActivatedRoute} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit {

  title: string = 'Nueva Factura';
  factura: Factura = new Factura();
  myControl = new FormControl();
  products: string[] = ['Mesa', 'Tablet', 'Sony', 'TV LG'];
  filteredProducts: Observable<string[]>;

  constructor(public clienteService: ClienteService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let clienteId =+ params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });
    this.filteredProducts = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.products.filter(option => option.toLowerCase().includes(filterValue));
  }

}
