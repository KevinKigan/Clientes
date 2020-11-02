import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthService, private router:Router) { }

  ngOnInit(): void {

  }

  logout():void{
    let username = this.authService.user.username;
    this.authService.logout();
    swal.fire('Sesión Cerrada',`${username}`+', has cerrado sesión.', 'success');
    this.router.navigate(['/clientes']);
  }
}
