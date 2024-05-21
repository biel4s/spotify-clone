import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {AuthService} from "./auth.service";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {merge} from "rxjs";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    MatButton,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconButton,
    MatIcon,
    MatCheckbox
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {
  isPasswordHidden: boolean = true;
  isPasswordChecked: boolean = false;
  invalidEmail: string = '';
  invalidPassword: string = '';

  readonly authForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private readonly fb: FormBuilder, public readonly authService: AuthService) {
    merge(this.authForm.statusChanges, this.authForm.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => this.updateErrorMessage());
  }

  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  updateErrorMessage(): void {
    if (this.authForm.hasError('required')) {
      this.invalidPassword = 'Please enter your password.';
    } else if (this.authForm.hasError('email')) {
      this.invalidEmail = 'Please enter your Spotify username or email address.';
    } else {
      this.invalidEmail = '';
      this.invalidPassword = '';
    }
  }

  onSubmit(): void {
    const credentials = this.authForm.getRawValue();

    this.authService.createWithEmail(credentials.email, credentials.password);
  }
}
