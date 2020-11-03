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
    if(this.authService.isAuthenticated()){
      swal.fire('Login','hola', 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login(): void{
    if(this.user.username == null || this.user.password ==null){
      swal.fire('Error al Iniciar Sesión', 'El Nombre de Usuario o Contraseña se encuentran vacío', 'error');
      return;
    }
    this.authService.login(this.user).subscribe(response =>{
      this.authService.saveUser(response.access_token);
      this.authService.saveToken(response.access_token);
      let user = this.authService.user;
      this.router.navigate(['/clientes']);
      swal.fire('Login',`Bienvenido ${user.username}, has iniciado sesión con éxito`, 'success');
    }, error => {
      if(error.status == 400){
        swal.fire('Error a iniciar sesión','Usuario o Contraseña incorrectos', 'error');
      }
    });
  }
}
