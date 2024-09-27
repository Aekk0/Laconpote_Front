import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface AuthenticateOptions {
  email: string;
  password: string;
}

export interface UpdateOptions {
  token: string;
  email?: string;
  password?: string;
}

export interface RegisterOptions {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/auth";
  private userURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/user";
  currentUserSubject = new BehaviorSubject(null);

  public user$ = this.currentUserSubject.asObservable();


  constructor(private http: HttpClient) {
  }

  public async authenticate(options: AuthenticateOptions) {
    const { email, password } = options;

    return this.http.post(this.authURL, { email, password, includeUserData: true }).pipe(
      tap(authData => {
        this.currentUserSubject.next(authData as any);
        localStorage.setItem("access_token", (authData as any).accessToken);
        localStorage.setItem("refresh_token", (authData as any).refreshToken);
        localStorage.setItem("expire_in", (authData as any).expireIn);
      })
    );
  }

  setData(authData: any) {
    this.currentUserSubject.next(authData);
    localStorage.setItem("access_token", (authData as any).accessToken);
    localStorage.setItem("refresh_token", (authData as any).refreshToken);
    localStorage.setItem("expire_in", (authData as any).expireIn);
  }

  getState(): any {
    return this.currentUserSubject.getValue(); // Return the latest state value
  }

  public async logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expire_in");
    this.currentUserSubject.next(null);
  }

  public async register(options: RegisterOptions) {
    return this.http.post(this.authURL, options).pipe(
      tap(__ => {
        return this.authenticate({ email: options.email, password: options.password })
      })
    );
  }

  public async update(options: UpdateOptions) {
    const { token, email, password } = options;

    const isEmail = typeof email !== "undefined";

    return this.http.patch(this.userURL, {
      op: "replace",
      path: `/${isEmail ? "email" : "password"}`,
      value: isEmail ? email : password,
      Headers: {
        authorization: `Bearer ${token}`
      }
    });
  }
}
