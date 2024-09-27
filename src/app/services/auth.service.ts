import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

export interface AuthenticateOptions {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/auth";
  private userURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/user"
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
    // CLEAR LOCAL STORAGE
  }

  public async register(options: any) {
    //
  }

  // public async update(options?: any) {
  //   const email = "bar@gmail.com";
  //   const userId = 3;
    
  //   const user = await lastValueFrom(this.http.patch(`${this.userURL}/${userId}`, [
  //     {
  //       op: "replace",
  //       path: "/email",
  //       value: email
  //     }
  //   ], {
  //     headers: {
  //       authorization: `Bearer ${options.accessToken}`
  //     }
  //   }));
  // }
}
