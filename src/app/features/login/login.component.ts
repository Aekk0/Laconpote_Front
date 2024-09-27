import { Component, Inject } from '@angular/core';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

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
  confirmPassword: string = "";
  email: string = "";

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

  async onSubmitForm(form: NgForm): Promise<void> {
    await this.authService.authenticate(form.value);
    if (form.valid && this.password === this.confirmPassword) {
      console.log('Form submitted successfully!');
    } else {
      console.error('Form invalid or passwords do not match');
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
