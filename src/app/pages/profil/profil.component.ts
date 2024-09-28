import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './profil.component.html',
  styleUrl: './profil.component.css'
})
export class ProfilComponent {
  readonly number = new FormControl('', [Validators.required]);
  readonly street = new FormControl('', [Validators.required]);
  readonly city = new FormControl('', [Validators.required]);
  readonly ZIPCode = new FormControl('', [Validators.required]);
  readonly phone = new FormControl('', [Validators.required]);

  errorMessage = signal('');
  message: string = "";

  user: any;

  constructor(
    private authService: AuthService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);

    merge(this.number.statusChanges, this.number.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    console.log("USER", this.user);
  }

  updateErrorMessage() {
    if (this.number.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }

  async onSubmitAddress(form: NgForm) {
    this.authService.addAddress({
      number: this.number.value,
      street: this.street.value,
      city: this.city.value,
      ZIPCode: this.ZIPCode.value,
      phone: this.phone.value
    }, this.user.accessToken).subscribe({
      next: (response) => {
        this.number.reset();
        this.street.reset();
        this.city.reset();
        this.ZIPCode.reset();
        this.phone.reset();

        this.message = "Addresse enregistrée";
      },
      error: (error) => {
        this.errorMessage.set(error.message);
        console.error(error);
      }
    });
  }
}
