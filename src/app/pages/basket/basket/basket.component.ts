import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { loadScript, PayPalNamespace } from '@paypal/paypal-js';
import { BasketService } from '../../../services/basket/basket.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
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

  constructor(
    private basketService: BasketService,
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
    this.basketService.getCurrentBasket().subscribe((basket) => this.basket = basket);

    if (this.basket !== null) {
      for (const product of this.basket) {
        this.totalPrice = this.totalPrice + (product.quantity * product.price)
      }
    }
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.paypal = await loadScript({
      currency: "EUR",
      clientId: this.paypalClientId,
      environment: "production"
    })

    if (this.totalPrice > 0 && this.user) {
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
        onApprove: (data, actions) => {
          return actions.order!.capture().then((details) => {
            this.basketService.setBasket(null);

            alert("Transaction Completed");
          });
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
    if (this.user) {
      this.totalPrice = 0;
      if (this.basket !== null) {
        for (const product of this.basket) {
          this.totalPrice = this.totalPrice + (product.quantity * product.price)
        }
      }

      this.div.nativeElement.children[this.index].style = "display: none;";
      this.index++;

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
        onApprove: (data, actions) => {
          return actions.order!.capture().then((details) => {
            console.log("Transaction completed:", details);

            alert("Transaction Completed");
          });
        },
        onError: (error) => {
          console.error("PAYPAL error:", error);

          alert("Transaction Failed");
        }
      }).render("#paypal-button-container");
    }
  }
}
