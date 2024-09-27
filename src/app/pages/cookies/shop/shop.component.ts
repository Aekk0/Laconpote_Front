import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../../services/product/product.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-shop-cookie',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shop.component.html',
  styleUrl: './shop.component.css'
})
export class CookiesShopComponent implements OnInit {
  products: any;

  user: any;

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
    console.log("FOO", this.user);
    const foo = this.authService.getState();

    console.log("BABRABA", foo);
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize(): Promise<void> {
    this.products = await this.productService.getAll();
  }
}
