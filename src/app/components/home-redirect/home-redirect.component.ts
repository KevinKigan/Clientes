import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-redirect',
  templateUrl: './home-redirect.component.html'
})
export class HomeRedirectComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
    swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Vas a ser redirigido a Clientes',
      showConfirmButton: false,
      timer: 2000
    }).finally(()=>this.router.navigate(['/clientes']));

  }

}
