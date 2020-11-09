import { Component, OnInit } from '@angular/core';
import {FacturaService} from '../services/factura.service';
import {Factura} from '../../facturas/models/factura';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-factura-detail',
  templateUrl: './factura-detail.component.html'
})
export class FacturaDetailComponent implements OnInit {

  factura: Factura;
  title: string = 'Factura';
  constructor(private facturaService: FacturaService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params=>{
      let id=+ params.get('id');
      this.facturaService.getFactura(id).subscribe(factura => this.factura = factura);
    });
  }

}
