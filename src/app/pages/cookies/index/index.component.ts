// Import Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Internal
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-index-cookie',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class CookiesIndexComponent {
  user: any;

  constructor(private authService: AuthService) {
    this.authService.currentUserSubject.subscribe((user) => {
      console.log("COOKIES", user);

      this.user = user;
    });
  }


}
