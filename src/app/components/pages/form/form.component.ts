import { Component, OnInit } from '@angular/core';
import {Cliente} from '../clientes/cliente';
import {ClienteService} from '../../services/cliente.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  cliente:Cliente = new Cliente();
  title: string = "Crear Cliente";

  constructor(private clienteService: ClienteService, private router: Router) { }

  ngOnInit(): void {
  }

  public create(): void{
    console.log("Cliked!");
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes']); // Redirige al listado de clientes
        swal.fire('Cliente Guardado', `Cliente ${cliente.clientName} creado con éxito`, 'success') // Muestra un popup
      }
    );
  }


}
