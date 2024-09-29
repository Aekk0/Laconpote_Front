import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { BasketService } from '../../../services/basket/basket.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order/order.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {
  @ViewChild("paypal") div: ElementRef | any;

  paypal: any;
  basket: any[] = [];
  totalPrice: number = 0;
  index = 0;
  paypalClientId = environment.paypalClientID;
  user:any;
  order: any = {};
  addressSelected: any | null = null;

  constructor(
    private basketService: BasketService,
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
    this.basketService.getCurrentBasket().subscribe((basket) => this.basket = basket);

    if (this.basket !== null) {
      this.order.address_id = this.addressSelected === null ? null : this.addressSelected.id;
      this.order.products = this.basket;

      for (const product of this.basket) {
        this.order.totalPrice = this.totalPrice;
        this.totalPrice = this.totalPrice + (product.quantity * product.price)
      }
    }
  }

  ngOnInit() {
    this.init();
  }

  async onAddressChange(any: any) {
    return this.updatePricing();
  }

  trackByFn(index: number, address: any) {
    return address.id;
  }

  async init() {
    this.paypal = await loadScript({
      currency: "EUR",
      clientId: this.paypalClientId,
      environment: "production"
    })

    if (this.totalPrice > 0 && (this.user && (this.user.address && this.user.addresses.length > 0)) && this.addressSelected !== null) {
      await (this.paypal as PayPalNamespace).Buttons!({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "EUR",
                  value: String(this.totalPrice)
                }
              }
            ]
          })
        },
        onApprove: async (data, actions) => {
          console.log("FOOOO", this.order, this.user.accessToken);
            this.orderService.createOrder({
              ...this.order,
              token: this.user.accessToken,
              products: this.order.products.map((product: any) => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price
              }))
            }).subscribe({
              next(value) {
                console.log("SUCCESS");

                alert("Transaction Completed");
                // actions.order!.capture().then((details) => {
                //   console.log("Transaction completed:", details);
                //   // this.basketService.setBasket(null);
                // })
              },
              error: (error) => {
                console.log("ERROR", error);
                alert("Transaction Completed, but order creation failed.");
              }
            })

            this.basketService.setBasket(null);
        },
        onError: (error) => {
          alert("Transaction Failed");
        }
      }).render("#paypal-button-container");
    }
  }

  async decreaseProductQuantity(product: any) {
    let exist = false;

    let index = 0;
    for (const basketProduct of this.basket) {
      if (basketProduct && (product["id"] === basketProduct["id"])) {
        exist = true;

        if (this.basket[index].quantity === 1) {
          this.basket.splice(index, 1);
        }
        else {
          this.basket[index] = { ...product, quantity: product.quantity - 1 };
        }
      }

      index++;
    }

    if (!exist) {
      this.basket.push(product);
    }

    await this.updatePricing();
  }

  async increaseProductQuantity(product: any) {
    let exist = false;

    let index = 0;
    for (const basketProduct of this.basket) {
      if (product["id"] === basketProduct["id"]) {
        exist = true;

        this.basket[index] = { ...product, quantity: product.quantity + 1 };
      }

      index++;
    }

    if (!exist) {
      this.basket.push({ ...product, quantity: 1 });
    }

    await this.updatePricing();
  }

  async updatePricing() {
    if (this.totalPrice > 0 && this.user && this.user.addresses.length > 0 && this.addressSelected !== null) {
      this.totalPrice = 0;
      if (this.basket !== null) {
        this.order.products = this.basket;

        for (const product of this.basket) {
          this.totalPrice = this.totalPrice + (product.quantity * product.price)
        }
      }

      this.order.totalPrice = this.totalPrice;
      this.order.address_id = this.addressSelected === null ? null : this.addressSelected.id;

      if (this.div.nativeElement.children && this.div.nativeElement.children.length > 0) {
        this.div.nativeElement.children[this.index].style = "display: none;";
        this.index++;
      }

      await (this.paypal as PayPalNamespace).Buttons!({
        createOrder: (data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                amount: {
                  currency_code: "EUR",
                  value: String(this.totalPrice)
                }
              }
            ]
          })
        },
        onApprove: async (data, actions) => {
          console.log("FOOOO", this.order, this.user.accessToken);
            this.orderService.createOrder({
              ...this.order,
              token: this.user.accessToken,
              products: this.order.products.map((product: any) => ({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price
              }))
            }).subscribe({
              next(value) {
                console.log("SUCCESS");

                alert("Transaction Completed");
                // actions.order!.capture().then((details) => {
                //   console.log("Transaction completed:", details);
                //   // this.basketService.setBasket(null);
                // })
              },
              error: (error) => {
                console.log("ERROR", error);
                alert("Transaction Completed, but order creation failed.");
              }
            })

            this.basketService.setBasket(null);
        },
        onError: (error) => {
          console.error("PAYPAL error:", error);

          alert("Transaction Failed");
        }
      }).render("#paypal-button-container");
    }
  }
}
