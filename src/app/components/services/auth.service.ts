import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {urlEndPointOAuth, webCredentials} from '../../../environments/environment';
import {User} from '../users/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient) { }

  login(user:User):Observable<any>{
    const httpHeaders = new HttpHeaders({'Content-Type':'application/x-www-form-urlencoded','Authorization':'Basic '+webCredentials});
    let params = new URLSearchParams();
    params.set('grant_type','password');
    params.set('username',user.username);
    params.set('password',user.password);
    console.log(params.toString());
    return this.http.post(urlEndPointOAuth, params.toString(), {headers:httpHeaders})
  }
}
