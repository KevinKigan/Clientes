import { Component, OnInit } from '@angular/core';
import {User} from './user';
import swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title: String = 'Por favor Regístrate!';
  user:User

  constructor() {
    this.user = new User();
  }

  ngOnInit(): void {
  }

  login(): void{
    console.log(this.user);
    if(this.user.username == null || this.user.password ==null){
      swal.fire('Error al Iniciar Sesión', 'El Nombre de Usuario o Contraseña se encuentran vacío', 'error');
      return;
    }
  }
}
