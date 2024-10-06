import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/cookie/header/header.component';
import { FooterComponent } from './navigation/cookie/footer/footer.component';
import { AuthService } from './services/auth.service';
import { ProductService } from './services/product/product.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'FrontCompote';
  user: any;

  constructor(
    private authService: AuthService,
    private productService: ProductService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
  }

  ngOnInit() {
    this.initialize();
  }

  async initialize(): Promise<void> {
    await this.productService.getAll();
  
    if (!this.user) {
      const token = localStorage.getItem("access_token");
  
      if (token !== "undefined" && token !== null) {
        const userObservable = await this.authService.getUserData(token);
        const user = await firstValueFrom(userObservable);
        this.authService.setData({
          userData: user,
          accessToken: token,
          refreshToken: localStorage.getItem("refresh_token"),
          expireIn: localStorage.getItem("expire_in")
        });
      }
    }
  }
}
