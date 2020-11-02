import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {urlEndPointOAuth, webCredentials} from '../../../environments/environment';
import {User} from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _user: User;
  private _token: string;

  constructor(private http:HttpClient) { }

  login(user:User):Observable<any>{
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded','Authorization':'Basic '+webCredentials});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',user.username);
    params.set('password',user.password);

    return this.http.post(urlEndPointOAuth, params.toString(), {headers:httpHeaders})
  }

  saveUser(accessToken: string):void {
    let payload = this.getTokenData(accessToken);
    this._user = new User();
    this._user.username  = payload.user_name;
    this._user.lastName  = payload.LastName;
    this._user.firstName = payload.firstName;
    this._user.mail      = payload.Mail;
    this._user.roles     = payload.authorities;
    sessionStorage.setItem('user',JSON.stringify(this._user));
  }

  saveToken(accessToken: string):void {
    this._token = accessToken;
    sessionStorage.setItem('token',accessToken);
  }

  isAuthenticated():boolean{
    let payload = this.getTokenData(this.token);
    if(payload!=null && payload.user_name && payload.user_name.length>0){
      return true;
    }else{
      return false;
    }
  }

  getTokenData(accessToken: string):any{
    if(accessToken!=null){
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  get user(): User {
    if(this._user!=null) {
      return this._user;
    }else if(this._user==null && sessionStorage.getItem('user')!=null){
      this._user = JSON.parse(sessionStorage.getItem('user')) as User;
      return this._user;
    }
    return new User();
  }

  get token(): string {
    if(this._token!=null) {
      return this._token;
    }else if(this._token==null && sessionStorage.getItem('token')!=null){
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  logout():void {
    this._user = null;
    this._token = null;
    sessionStorage.clear();
  }
}
