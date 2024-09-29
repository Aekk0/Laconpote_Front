import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/order";

  constructor(private http: HttpClient) {
  }

  public createOrder(options: any) {
    const { token, ...order } = options;

    return this.http.post(this.orderURL, {
      ...order
    }, {
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }
}
