import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';

import { AuthService } from '../../../services/auth.service';
import { LoginComponent } from '../../../features/login/login.component';
import { BasketService } from '../../../services/basket/basket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  user: any;

  constructor(
    private authService: AuthService,
    private basketService: BasketService,
    @Inject(MatDialog) public dialog: MatDialog
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
  }

  openLogin(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "500px",
    });
  }

  openBasket(): void {
    const dialogRef = this.dialog.open(LoginComponent, {
      width: "500px"
    });
  }
}
