import {Component, OnInit} from '@angular/core';
import {Cliente} from './cliente';
import {ClienteService} from '../../services/cliente.service';
import {urlEndPointUploadImg, urlEndPointImg} from '../../../../environments/environment';
import {applySourceSpanToExpressionIfNeeded} from '@angular/compiler/src/output/output_ast';
import swal from 'sweetalert2';
import {ActivatedRoute} from '@angular/router';
import {ModalService} from '../../services/modal.service';
import {AuthService} from '../../services/auth.service';


@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginator: any;
  selectedClient: Cliente;
  urlEndPointUploadImg = urlEndPointUploadImg;
  urlEndPointImg = urlEndPointImg;

  constructor(
    private clienteService: ClienteService,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute,
    public  authService: AuthService) {

  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page = +params.get('page'); // El operador suma transforma el string en un number
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page).subscribe(    // El subscribe esta atento a si surge cualquier tipo de cambio en el observable (en este caso "clientes")
        response => {
          this.clientes = response.content as Cliente[];
          this.paginator = response;
        }
      );
    });
    this.modalService.notifyUpload.subscribe(cliente => {
      this.clientes = this.clientes.map(originalClient => {
        if (cliente.id == originalClient.id) {
          originalClient.photo = cliente.photo;
        }
        return originalClient;
      });
    });
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
          this.clientes = this.clientes.filter(cli => cli != cliente));
        swal.fire(
          'Eliminado!',
          `Se ha borrado al cliente ${cliente.clientName} ${cliente.lastName}`,
          'success'
        );
      }
    });
  }
  openModal(cliente: Cliente) {
    this.selectedClient = cliente;
    this.modalService.openModal();
  }
}
