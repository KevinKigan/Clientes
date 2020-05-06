import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from '../../services/cliente.service';
import {logger} from 'codelyzer/util/logger';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(private clienteService: ClienteService) {

  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(    // El subscribe esta atento a si surge cualquier tipo de cambio en el observable (en este caso "clientes")
      clientes => this.clientes = clientes

    );
    console.log(this.clientes);
  }

}
