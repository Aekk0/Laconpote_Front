import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
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
  private authURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/auth";
  private userURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/user";
  private addressURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/address";
  currentUserSubject = new BehaviorSubject(null);

  public user$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {
  }

  public async authenticate(options: AuthenticateOptions) {
    const { email, password } = options;

    return this.http.post(this.authURL, { email, password, includeUserData: true });
  }

  setData(authData$: any) {
    authData$.subscribe((authData: any) => {
      this.currentUserSubject.next({
        ...authData,
        accessToken: (authData as any).accessToken ?? localStorage.getItem("access_token"),
        refreshToken: (authData as any).refreshToken ?? localStorage.getItem("refresh_token"),
        expireIn: (authData as any).expireIn ?? localStorage.getItem("expire_in")
      });

      if (authData["accessToken"]) {
        localStorage.setItem("access_token", (authData as any).accessToken);
        localStorage.setItem("refresh_token", (authData as any).refreshToken);
        localStorage.setItem("expire_in", (authData as any).expireIn);
      }
    })
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
    return this.http.post(this.authURL, options);
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
