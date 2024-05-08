import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LoginComponent } from '../../features/login/login.component';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;

  constructor(private authService: AuthService) {
    this.authService.getCurrentUser().subscribe((user) => this.user = user);
    console.log(this.user);
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    // this.authService.getCurrentUser().subscribe((user) => this.user = user);
    // console.log(this.user);
  }
}
