import { Component } from '@angular/core';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatError, MatFormField, MatLabel, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../auth.service";
import {merge} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-login',
  standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatButton,
        MatCheckbox,
        MatError,
        MatFormField,
        MatIcon,
        MatIconButton,
        MatInput,
        MatLabel,
        MatSuffix,
        ReactiveFormsModule,
        FooterComponent
    ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
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
    this.authService.loginWithEmail(credentials.email, credentials.password);
  }
}
