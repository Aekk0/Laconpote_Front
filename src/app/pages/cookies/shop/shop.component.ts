import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';

@Component({
  selector: 'app-shop-cookie',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class CookiesShopComponent implements OnInit {
  products: any;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.initialize();
  }

  async initialize(): Promise<void> {
    this.products = await this.productService.getAll();
  }
}
