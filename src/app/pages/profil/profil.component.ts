import { Component, OnInit, signal } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { OrderService } from '../../services/order/order.service';

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
export class ProfilComponent implements OnInit {
  readonly number = new FormControl('', [Validators.required]);
  readonly street = new FormControl('', [Validators.required]);
  readonly city = new FormControl('', [Validators.required]);
  readonly ZIPCode = new FormControl('', [Validators.required]);
  readonly phone = new FormControl('', [Validators.required]);

  errorMessage = signal('');
  message: string = "";

  user: any;
  order: any;

  constructor(
    private authService: AuthService,
    private orderService: OrderService
  ) {
    this.authService.user$.subscribe((user: any) => this.user = user);
    this.orderService.order$.subscribe((order: any) => this.order = order);

    merge(this.number.statusChanges, this.number.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());

    if (this.user.userData.role === "Admin") {
      this.orderService.getAllByAdmin(this.user.accessToken)
    }
    else {
      this.orderService.getAll(this.user.accessToken)
    }
    console.log("REHRHEHE", this.user, this.order);
  }

  ngOnInit(): void {
      this.init();
  }

  async init() {
    let order;

    if (this.user.userData.role === "Admin") {
      order = await this.orderService.getAllByAdmin(this.user.accessToken)
    }
    else {
      order = await this.orderService.getAll(this.user.accessToken)
    }

    this.orderService.setData(order);
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
