import {Component, OnInit} from '@angular/core';
import {Cliente} from '../clientes/cliente';
import {ClienteService} from '../../services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cliente: Cliente = new Cliente();
  title: string = 'Crear Cliente';
  titleEdit: string = 'Editar Cliente';
  errors: string[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadClient();
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']); // Redirige al listado de clientes
        swal.fire('Cliente Guardado',  `${json.mensaje} ${json.cliente.clientName}`, 'success'); // Muestra un popup
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']); // Redirige al listado de clientes
        swal.fire('Cliente Actualizado', `${json.mensaje} ${json.cliente.clientName}`, 'success'); // Muestra un popup
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error("Codigo del error desde el backend: " + err.status);
        console.error(err.error.errors);
      }
    );
  }



  public loadClient(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']; // Let se usa para declaracion de variables al igual que la palabra reservada "var"
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
  }


}
