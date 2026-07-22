import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ILogin, ISingIn } from '../model/auth';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth_Base_Url: string = environment.authBaseUrl
  isLoging$ : Subject<string> = new Subject<string>()

  constructor(private _http: HttpClient) { }

  login(userdetails: ILogin): Observable<any> {
    let login_url = `${this.auth_Base_Url}/api/auth/login`
    return this._http.post<any>(login_url, userdetails)
  }

  SignIn(userdetails: ISingIn): Observable<any> {
    let SingInUrl = `${this.auth_Base_Url}/api/auth/register`
    return this._http.post<any>(SingInUrl, userdetails)
  }
  saveToken(token: string) {
    localStorage.setItem('token', token)
  }
  saveUserRole(userRole: string) {
    localStorage.setItem('userRole', userRole)
  }

  getToken(): string | null {
    return localStorage.getItem('token')
  }
  getUserRole(): string | null {
    return localStorage.getItem('userRole')
  }

  LogOut() {
    localStorage.removeItem('token')
    localStorage.removeItem('userRole')
  }

}
