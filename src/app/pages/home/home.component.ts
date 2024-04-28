import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  user: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.authService.authenticate().subscribe((user) => {
      this.user = user;
    })
  }
}
