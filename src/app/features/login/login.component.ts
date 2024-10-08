import { Component, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  login: boolean = true;
  password: string = "";
  firstName: string = "";
  lastName: string = "";
  confirmPassword: string = "";
  email: string = "";

  error: string | null = null;

  constructor(
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(MatDialogRef) public dialogRef: MatDialogRef<LoginComponent>
  ) {

  }

  changeState() {
    if (this.login === true) {
      this.login = false;

      return;
    }

    this.login = true;
  }

  async onSubmitRegistration(form: NgForm): Promise<void> {
    if (form.valid && this.password === this.confirmPassword && this.firstName && this.lastName) {
      await this.authService.register(form.value);
      this.dialogRef.close();
    } else {
      this.error = "Missing email or password";
    }
  }

  closeDiag() {
    this.dialogRef.close();
  }

  async onSubmitLogin(form: NgForm): Promise<void> {
    if (form.valid && this.password) {
      const userObservable = await this.authService.authenticate(form.value);
      const userData = await firstValueFrom(userObservable);
      this.authService.setData(userData);
      this.dialogRef.close();
    }
    else {
      this.error = "Missing email or password";
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
