import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  password: string = "";
  email: string = "";

  constructor(private authService: AuthService) {
    
  }

  async onSubmitForm(form: NgForm): Promise<void> {

    await this.authService.authenticate(form.value);

  }
}
