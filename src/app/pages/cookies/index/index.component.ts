import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-index-cookie',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class CookiesIndexComponent {
  user: any;

  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    this.authService.user$.subscribe((user: any) => this.user = user);

    console.log("BEFORE UPDATE", this.user);
    const accessToken = localStorage.getItem("access_token");
    console.log("ACCESS TOKEN", accessToken);

  }
}
