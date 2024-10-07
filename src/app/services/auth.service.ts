import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

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
  private authURL = "http://localhost:3001/api/v1/auth";
  private userURL = "http://localhost:3001/api/v1/user";
  private addressURL = "http://localhost:3001/api/v1/address";
  currentUserSubject = new BehaviorSubject(null);

  public user$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public async authenticate(options: AuthenticateOptions) {
    const { email, password } = options;

    return this.http.post(this.authURL, { email, password, includeUserData: true });
  }

  setData(authData: any) {
    this.currentUserSubject.next({
      ...authData,
      accessToken: authData.accessToken ?? localStorage.getItem("access_token"),
      refreshToken: authData.refreshToken ?? localStorage.getItem("refresh_token"),
      expireIn: authData.expireIn ?? localStorage.getItem("expire_in")
    });

    if (authData["accessToken"]) {
      localStorage.setItem("access_token", authData.accessToken);
      localStorage.setItem("refresh_token", authData.refreshToken);
      localStorage.setItem("expire_in", authData.expireIn);
    }
  }

  getState(): any {
    return this.currentUserSubject.getValue(); // Return the latest state value
  }

  async getUserData(token: string) {
    return this.http.get(`${this.userURL}/data`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(userData => {
        this.currentUserSubject.next(userData as any);
      })
    );
  }

  public async logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("expire_in");
    this.currentUserSubject.next(null);
  }

  public async register(options: RegisterOptions) {
    return firstValueFrom(this.http.post(this.userURL, options));
  }

  public addAddress(options: any, token: string) {
    return this.http.post(this.addressURL, options,
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }

  public async update(options: UpdateOptions) {
    const { token, email, password } = options;

    const isEmail = typeof email !== "undefined";

    return this.http.patch(this.userURL, {
      op: "replace",
      path: `/${isEmail ? "email" : "password"}`,
      value: isEmail ? email : password
    },
    {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }
}
