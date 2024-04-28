import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';

export interface AuthenticateOptions {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:3001/api/v1/auth";

  constructor(private http: HttpClient) {
  }

  public authenticate(options?: AuthenticateOptions) {
    const email = "foo@gmail.com";
    const password = "password";
    
    return this.http.post(this.url, { email, password, includeUserData: true })
      .pipe(
        catchError(this.handleError("authenticate"))
      );
  }

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // Display Error or send it back
      console.log("ERROR", error);

      return of(result as T);
    }
  }
}
