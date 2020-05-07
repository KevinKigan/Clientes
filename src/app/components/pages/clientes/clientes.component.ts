import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from '../../services/cliente.service';
import {logger} from 'codelyzer/util/logger';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import swal from "sweetalert2";


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
  }


  public delete(cliente: Cliente): void {
    swal.fire({
      title: `¿Seguro que quiere borrar al cliente ${cliente.clientName} ${cliente.lastName}?`,
      text: '¡No se podrá revertir los cambios!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borrar cliente!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.delete(cliente.id).subscribe(response =>
          this.clientes = this.clientes.filter(cli => cli!=cliente));
        swal.fire(
          'Eliminado!',
          `Se ha borrado al cliente ${cliente.clientName} ${cliente.lastName}`,
          'success'
        )
      }
    });


  }
}
