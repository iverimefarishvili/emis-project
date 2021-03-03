import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { COREAPI } from 'src/app/interceptor/utils';
import { User } from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  public login(user: User): Observable<any> {
    return this.http.post(`${COREAPI}login`, user);
  }

  public logOut():any {
    localStorage.clear();
  }
}
