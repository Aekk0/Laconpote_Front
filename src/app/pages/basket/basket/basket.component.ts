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
import { ProviderService } from '../../../services/prodiver/provider.service';

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
  user: any;
  order: any = {};
  providers: any[] = [];
  addressSelected: any | null = null;
  providerSelected: any | null = null;
  showPaypalButton: boolean = false;

  constructor(
    private basketService: BasketService,
    private authService: AuthService,
    private orderService: OrderService,
    private providerService: ProviderService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
    this.basketService.getCurrentBasket().subscribe((basket) => {
      this.basket = basket;
      this.calculateTotalPrice();
    });
  }

  ngOnInit() {
    this.init();
    this.fetchProviders();
  }

  async init() {
    this.paypal = await loadScript({
      currency: "EUR",
      clientId: this.paypalClientId,
      environment: "production"
    });
  }

  async fetchProviders() {
    if (this.user && this.user.accessToken) {
      try {
        const observable = await this.providerService.getAll(this.user.accessToken);
        observable.subscribe({
          next: (providers: any) => {
            this.providers = providers;
          },
          error: (error) => {
            console.error('Error fetching providers:', error);
          }
        });
      } catch (error) {
        console.error('Error getting providers observable:', error);
      }
    }
  }

  calculateTotalPrice() {
    this.totalPrice = 0;
    for (const product of this.basket) {
      this.totalPrice += product.quantity * product.price;
    }
  }

  trackAddressByFn(index: number, address: any) {
    return address.id;
  }

  trackProviderByFn(index: number, provider: any) {
    return provider.id;
  }

  async updatePricing() {
    if (this.totalPrice > 0 && this.user && this.user.accessToken && this.user.userData.addresses.length > 0 && this.addressSelected !== null) {
      this.totalPrice = 0;
      let totalItems = 0;

      if (this.basket !== null) {
        this.order.products = this.basket;

        for (const product of this.basket) {
          this.totalPrice += product.quantity * product.price;
          totalItems += product.quantity;
        }
      }

      // Add provider price if a provider is selected
      if (this.providerSelected) {
        let shippingPrice = 0;

        if (this.providerSelected.name === "Colissimo") {
              if (totalItems <= 10) shippingPrice = 8.80;
              else shippingPrice = 10.15;
        }
        else {
          if (totalItems <= 10) shippingPrice = 5.40;
          else if (totalItems > 10 && totalItems < 16) shippingPrice = 10.15;
          else shippingPrice = 0;
        }

        this.totalPrice += shippingPrice;
      }

      this.order.totalPrice = this.totalPrice;
      this.order.address_id = this.addressSelected === null ? null : this.addressSelected.id;
      this.order.provider_id = this.providerSelected === null ? null : this.providerSelected.id;

      if (this.div) {
        if (this.div.nativeElement.children && this.div.nativeElement.children.length > 0) {
          this.div.nativeElement.children[this.index].style = "display: none;";
          this.index++;
        }
      }

      await this.renderPaypalButton();
    }
  }

  async decreaseProductQuantity(product: any) {
    if (product.quantity > 1) {
      product.quantity--;
    } else {
      this.basket = this.basket.filter(item => item.id !== product.id);
    }
    this.recalculateTotalPrice();
    await this.updateBasket();
  }

  async increaseProductQuantity(product: any) {
    product.quantity++;
    this.recalculateTotalPrice();
    await this.updateBasket();
  }

  async removeProduct(product: any) {
    this.basket = this.basket.filter(item => item.id !== product.id);
    this.recalculateTotalPrice();
    await this.updateBasket();
  }

  async updateBasket() {
    await this.basketService.setBasket(this.basket);
    this.recalculateTotalPrice();
    await this.updatePricing();
  }

  recalculateTotalPrice() {
    this.totalPrice = this.basket.reduce((total, product) => total + (product.price * product.quantity), 0);
  }

  async onAddressChange(address: any) {
    this.addressSelected = address;
    await this.updatePricing();
  }

  async onProviderChange(provider: any) {
    this.providerSelected = provider;
    await this.updatePricing();
  }

  async confirmOrder() {
    if (this.totalPrice > 0 && this.user && this.user.accessToken && this.user.userData.addresses.length > 0 && this.addressSelected !== null) {
      this.showPaypalButton = true;
      await this.renderPaypalButton();
    } else {
      alert("Please make sure you have items in your basket, are logged in, and have selected an address.");
    }
  }

  async renderPaypalButton() {
    if (this.div) {
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
          });
        },
        onApprove: async (data, actions) => {
          this.orderService.createOrder({
            ...this.order,
            token: this.user.accessToken,
            products: this.basket.map((product: any) => ({
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              quantity: product.quantity
            }))
          }).subscribe({
            next(value) {
              actions.order!.capture().then((details) => {
                alert("Transaction Completed");
              });
            },
            error: (error) => {
              alert("Transaction Completed, but order creation failed.");
            }
          });

          this.basketService.setBasket([]);
        },
        onError: (error) => {
          alert("Transaction Failed");
        }
      }).render("#paypal-button-container");
    }
  }
}
