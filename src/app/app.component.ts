import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './navigation/cookie/header/header.component';
import { FooterComponent } from './navigation/cookie/footer/footer.component';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FrontCompote';
  user: any;

  constructor(private authService: AuthService) {
    this.authService.user$.subscribe((user: any) => this.user = user);
  }
}
