import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, lastValueFrom, of } from 'rxjs';

export interface AuthenticateOptions {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = "http://localhost:3001/api/v1/auth";
  private userURL = "http://localhost:3001/api/v1/user"
  currentUserSubject = new BehaviorSubject(null);

  constructor(private http: HttpClient) {
  }

  public async authenticate(options: AuthenticateOptions) {
    const { email, password } = options;
    // const email = options.email;
    // const password = options.password
    // const email = "foo@gmail.com";
    // const password = "password";
     
    const authData = await lastValueFrom<any>(this.http.post(this.authURL, { email, password, includeUserData: true }));

    localStorage.setItem("access_token", authData.accessToken);
    localStorage.setItem("refresh_token", authData.refreshToken);
    localStorage.setItem("expire_in", authData.expireIn);

    this.setUser(authData.userData);
  }

  public async logout() {
    // CLEAR LOCAL STORAGE
  }

  public async create() {
    //
  }

  public async update(options?: any) {
    const email = "bar@gmail.com";
    const userId = 3;
    
    const user = await lastValueFrom(this.http.patch(`${this.userURL}/${userId}`, [
      {
        op: "replace",
        path: "/email",
        value: email
      }
    ], {
      headers: {
        authorization: `Bearer ${options.accessToken}`
      }
    }));

    this.setUser(user);
  }

  getCurrentUser(): Observable<any> {
    return this.currentUserSubject.asObservable();
  }

  setUser(user: any): void {
    this.currentUserSubject.next(user);
  }
}
