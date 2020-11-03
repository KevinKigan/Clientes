import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../../services/auth.service';
import swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(public authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // Esta data se especifica en el app-routing-module.ts data:{role:'ROLE_ADMIN'}
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }
    let role = next.data['role'] as string;
    console.log(role);
    if(this.authService.hasRole(role)){
      return true;
    }else{
      swal.fire('Acceso no autorizado', `${this.authService.user.username} no tienes acceso a este recurso`, 'warning');
      this.router.navigate(['/clientes']);
      return false;
    }
  }

}
