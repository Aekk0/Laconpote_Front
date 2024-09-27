import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

import {MatDialog} from '@angular/material/dialog';
import { LoginComponent } from '../../../features/login/login.component';
import { BasketService } from '../../../services/basket/basket.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
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
    this.authService.getCurrentUser().subscribe((user) => this.user = user);
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
