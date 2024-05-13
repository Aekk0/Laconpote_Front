// Import Angular
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Import Internal
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../../features/login/login.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;

  constructor(private authService: AuthService) {
    this.authService.currentUserSubject.subscribe((user) => {
      console.log("HOME", user);

      this.user = user;
    });
  }
}
