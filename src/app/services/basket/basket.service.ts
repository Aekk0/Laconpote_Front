import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

type Product = Record<string, any> & { quantity: number; };

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  currentBasketSubject = new BehaviorSubject(null);

  constructor() { }

  public async update(products: Product[]) {
    let currents: undefined | Product[];

    this.getCurrentBasket().subscribe((basket) => currents = basket);

    const result = [];

    if (!currents) {
      this.setBasket(products);

      return;
    }

    let index = 0;
    for (const product of products) {
      const sameProduct = currents.find((current: any) => current.id === product["id"]);

      if (!sameProduct) {
        result.push(product);

        continue;
      }

      delete products[index];
      result.push({
        ...product,
        quantity: product.quantity + sameProduct.quantity
      });

      index++;
    }

    this.setBasket(result);
  }

  public async increase(product: Product) {
    let basket: Product[] = [];

    this.getCurrentBasket().subscribe((basket) => basket = basket);

    if (basket.length === 0) {
      throw new Error("No available basket");
    }

    const relatedProduct = basket.find((basketProduct) => basketProduct["id"] === product["id"]);

    if (!relatedProduct) {
      throw new Error("Unable to increase quantity on an unknown product");
    }

    relatedProduct.quantity = product.quantity;

    let index = 0;
    for (const basketProduct of basket) {
      if (basketProduct["id"] === product["id"]) {
        basket[index] = relatedProduct;

        break;
      }

      index++;
    }

    this.setBasket(basket);
  }

  public async decrease(product: Product) {
    let basket: Product[] = [];

    this.getCurrentBasket().subscribe((basket) => basket = basket);

    if (basket.length === 0) {
      throw new Error("No available basket");
    }

    const relatedProduct = basket.find((basketProduct) => basketProduct["id"] === product["id"]);

    if (!relatedProduct) {
      throw new Error("Unable to decrease quantity on an unknown product");
    }

    relatedProduct.quantity = product.quantity;

    let index = 0;
    for (const basketProduct of basket) {
      if (basketProduct["id"] === product["id"]) {
        basket[index] = relatedProduct;

        break;
      }

      index++;
    }

    this.setBasket(basket);
  }

  public async removeProduct(productId: string) {
    let basket: Product[] = [];

    this.getCurrentBasket().subscribe((basket) => basket = basket);

    if (basket.length === 0) {
      throw new Error("No available basket");
    }

    const relatedProduct = basket.find((basketProduct) => basketProduct["id"] === productId);

    if (!relatedProduct) {
      throw new Error("Unable to remove quantity on an unknown product");
    }

    let index = 0;
    for (const basketProduct of basket) {
      if (basketProduct["id"] === productId) {
        delete basket[index];

        break;
      }

      index++;
    }

    this.setBasket(basket);
  }

  getCurrentBasket(): Observable<any> {
    return this.currentBasketSubject.asObservable();
  }

  setBasket(basket: any): void {
    this.currentBasketSubject.next(basket);
  }
}
