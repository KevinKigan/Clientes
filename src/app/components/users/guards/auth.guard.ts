import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from '../../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(public authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authService.isAuthenticated()) {
      if(this.isTokenExpired()){
        this.authService.logout()
        this.router.navigate(['/login'])
        return false;
      }
      return true;
    }else{
      this.router.navigate(['/login'])
      return false;
    }
  }

  isTokenExpired():boolean{
    let token = this.authService.token;
    let payload = this.authService.getTokenData(token);
    // getTime debuelve la fecha en milisegundos, por eso se divide entre mil
    let now = new Date().getTime()/1000;
    // Paiload.exp muestra la fecha de expiracion del token
    if(payload.exp < now){
      return true;
    }else{
      return false;
    }
  }

}
