import { Component, OnInit } from '@angular/core';
import {User} from './user';
import swal from 'sweetalert2'
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  title: String = 'Por favor Regístrate!';
  user:User

  constructor(private authService: AuthService, private router: Router) {
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
    this.authService.login(this.user).subscribe(response =>{
      console.log(response);
      let payload = JSON.parse(atob(response.access_token.split(".")[1]));
      console.log(payload.username);
      this.router.navigate(['/clientes']);
      swal.fire('Login',`Bienvenido ${payload.username}, has iniciado sesión con éxito`, 'success');
    });
  }
}
