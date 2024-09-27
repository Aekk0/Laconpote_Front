import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-galerie',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './galerie.component.html',
  styleUrl: './galerie.component.css'
})
export class CookiesGalerieComponent {
  user: any;

  constructor(
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
  }
}
