import {Component, OnInit} from '@angular/core';
import {Cliente} from '../clientes/cliente';
import {ClienteService} from '../../services/cliente.service';
import {ActivatedRoute, Router} from '@angular/router';
import swal from 'sweetalert2';
import {Region} from '../clientes/region';

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
  regions: Region[];

  constructor(private clienteService: ClienteService, private router: Router, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.loadClient();
    this.loadRegions();
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']); // Redirige al listado de clientes
        swal.fire('Cliente Guardado', `${json.mensaje} ${json.cliente.clientName}`, 'success'); // Muestra un popup
      },
      err => {
        this.errors = err.error.errors as string[];
        console.error('Codigo del error desde el backend: ' + err.status);
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
        console.error('Codigo del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }


  private loadClient(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']; // Let se usa para declaracion de variables al igual que la palabra reservada "var"
      if (id) {
        this.clienteService.getCliente(id).subscribe((cliente) => this.cliente = cliente);
      }
    });
  }


  private loadRegions() {
    // @ts-ignore
    this.clienteService.getRegiones().subscribe(regions => {
      this.regions = regions;
    });
  }

  compareRegions(r1: Region, r2: Region): boolean { // Si alguna region es null retorna false y si ambas son iguales retorna true
    if(r1 === undefined && r2 === undefined){
      return true;
    }
    return r1 === null || r2 === null || r1 === undefined || r2 === undefined ? false : r1.id === r2.id;
  }

  // compararRegion(o1: Region, o2: Region): boolean {
  //   if (o1 === undefined && o2 === undefined) {
  //     return true;
  //   }
  //   return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.region_id === o2.region_id;
  // }
}
