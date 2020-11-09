import {Component, OnInit} from '@angular/core';
import {Factura} from '../../facturas/models/factura';
import {ClienteService} from '../services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {FacturaService} from '../services/factura.service';
import {Product} from '../../facturas/models/product';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {ItemFactura} from '../../facturas/models/item-factura';
import swal from 'sweetalert2';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit {

  title: string = 'Nueva Factura';
  factura: Factura = new Factura();
  autocompleteControl = new FormControl();
  filteredProducts: Observable<Product[]>;

  constructor(
    public clienteService: ClienteService,
    public facturaService: FacturaService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(cliente => this.factura.cliente = cliente);
    });
    this.filteredProducts = this.autocompleteControl.valueChanges
      .pipe(
        map(value => typeof value === 'string' ? value : value.productName),
        // si value no existe se devuelve vacio
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Product[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.getFilteredProducts(filterValue);
  }

  showName(product?: Product): string | undefined {
    return product ? product.productName : undefined;
  }

  selectionProduct(event: MatAutocompleteSelectedEvent): void {
    let product = event.option.value as Product;
    if (this.exitsItem(product.id)) {
      this.increaseQuantity(product.id);
    } else {
      let newItem = new ItemFactura();
      newItem.product = product;
      this.factura.items.push(newItem);
    }
    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  updateQuantity(id: number, event: any): void {
    let quantity: number = event.target.value as number;
    if (quantity == 0) {
      return this.deleteItemFactura(id);
    }
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.product.id) {
        item.quantity = quantity;
      }
      return item;
    });
  }

  /**
   * Combrueba si el item ya se encuentra en la lista de items
   *
   * @param id
   */
  exitsItem(id: number): boolean {
    let exits = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.product.id) {
        exits = true;
      }
    });
    return exits;
  }


  /**
   * Incrementa en uno al añadir un producto que ya se encontraba en la lista de productos
   *
   * @param id
   */
  increaseQuantity(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.product.id) {
        ++item.quantity;
      }
      return item;
    });
  }


  deleteItemFactura(id: number): void {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id !== item.product.id);
  }

  createFactura(): void {
    this.facturaService.create(this.factura).subscribe(factura => {
      swal.fire(
        'Factura Creada!',
        `Se ha creado correctamente la factura: ${factura.description}`,
        'success'
      );
      this.router.navigate(['/clientes']);
    });
  }
}
