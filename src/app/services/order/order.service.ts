import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orderURL = "https://cookies-api-7996f284e7c0.herokuapp.com/api/v1/order";
  currentOrderSubject = new BehaviorSubject(null);

  public order$ = this.currentOrderSubject.asObservable();

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

  public async getAll(token: string) {
    return this.http.get(`${this.orderURL}`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(orderData => {
        this.currentOrderSubject.next(orderData as any);
      })
    )
  }

  public async getAllByAdmin(token: string) {
    return this.http.get(`${this.orderURL}/all`, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }).pipe(
      tap(orderData => {
        this.currentOrderSubject.next(orderData as any);
      })
    )
  }

  setData(order$: any) {
    order$.subscribe((orderData: any) => {
      this.currentOrderSubject.next(orderData)
    })
  }

  getState() {
    return this.currentOrderSubject.getValue();
  }
}
