import { Component } from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
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

  readonly authForm = this.fb.nonNullable.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.required]]
  })

  constructor(private readonly fb: FormBuilder, public readonly authService: AuthService) { }

  togglePasswordVisibility(): void {
    this.isPasswordHidden = !this.isPasswordHidden;
  }

  onSubmit(): void {
    const credentials = this.authForm.getRawValue();

    this.authService.createWithEmail(credentials.email, credentials.password);
  }
}
