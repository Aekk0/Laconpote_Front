import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  currentBasketSubject = new BehaviorSubject(null);

  constructor() { }

  public async update(products: [Record<string, any> & { quantity: number; }]) {
    let currents = null;

    this.getCurrentBasket().subscribe((basket) => currents = basket);

    const result = [];

    for (const product of products) {
      const sameProduct = currents!.find((current: any) => current.id === product["id"]);

      if (!sameProduct) {
        result.push(product);

        continue;
      }

      result.push({
        ...product,
        quantity: product.quantity + sameProduct.quantity
      });
    }

    this.setBasket(result);
  }

  public async increase() {

  }

  public async decrease() {

  }

  public async removeProduct(productId: string) {
    
  }

  getCurrentBasket(): Observable<any> {
    return this.currentBasketSubject.asObservable();
  }

  setBasket(basket: any): void {
    this.currentBasketSubject.next(basket);
  }
}
