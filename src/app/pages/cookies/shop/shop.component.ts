import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { AuthService } from '../../../services/auth.service';
import { BasketService } from '../../../services/basket/basket.service';

@Component({
  selector: 'app-shop-cookie',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class CookiesShopComponent implements OnInit {
  products: any;
  basket: any = [];
  stateLessBasket: any = [];

  user: any;

  constructor(
    private authService: AuthService,
    private basketService: BasketService,
    private productService: ProductService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
    this.basketService.getCurrentBasket().subscribe((basket: any) => this.basket = basket);
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize(): Promise<void> {
    this.products = await this.productService.getAll();

    this.products = this.products.map((product: any) => {
      return { ...product, quantity: 0 };
    });
  }

  decreaseProductQuantity(product: any) {
    let exist = false;

    let index = 0;
    for (const basketProduct of this.stateLessBasket) {
      if (basketProduct && (product["id"] === basketProduct["id"])) {
        exist = true;

        if (this.stateLessBasket[index].quantity === 1) {
          this.stateLessBasket = this.stateLessBasket.splice(index, 1);
        }
        else {
          this.stateLessBasket[index] = { ...product, quantity: product.quantity - 1 };
        }
      }

      index++;
    }

    if (!exist) {
      return
    }

    this.products = this.products.map((ite: any) => {
      if (product["id"] === ite["id"]) {
        return { ...product, quantity: product.quantity - 1 };
      }

      return ite;
    });
  }

  increaseProductQuantity(product: any) {
    let exist = false;

    let index = 0;
    for (const basketProduct of this.stateLessBasket) {
      if (product["id"] === basketProduct["id"]) {
        exist = true;

        this.stateLessBasket[index] = { ...product, quantity: product.quantity + 1 };
      }

      index++;
    }

    if (!exist) {
      this.stateLessBasket.push({ ...product, quantity: 1 });
    }

    this.products = this.products.map((ite: any) => {
      if (product["id"] === ite["id"]) {
        return { ...product, quantity: product.quantity + 1 };
      }

      return ite;
    });
  }

  async updateBasket() {
    await this.basketService.update(this.stateLessBasket);

    this.stateLessBasket = [];
    this.products = this.products.map((product: any) => {
      return {
        ...product,
        quantity: 0
      }
    });

    console.log(this.basket, this.basket.length);
  }
}
