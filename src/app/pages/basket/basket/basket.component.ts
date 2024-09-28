import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { loadScript } from '@paypal/paypal-js';
import { BasketService } from '../../../services/basket/basket.service';

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.css'
})
export class BasketComponent implements OnInit {
  paypal: any;
  basket: any;

  constructor(
    private basketService: BasketService
  ) {
    this.basketService.getCurrentBasket().subscribe((basket) => this.basket = basket);
  }

  ngOnInit() {
    this.init();
  }

  async init() {
    this.paypal = await loadScript({
      clientId: "AZH51tMmdx9bTphwRFBT7T9T-fbrUkcKSGdRKqbaekKDjO5QOXL7idPYFA1OwLW1d0f4OIZ7ay-nXuxq"
    })

    await this.paypal.Buttons().render("#paypal-button-container");
  }
}
