import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {AuthService, Credentials} from "../auth.service";
import {Router} from "@angular/router";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButton,
    NgIf,
    MatError,
    MatIcon
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  isEmailCorrect: boolean = false;

  readonly signupForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['']
  })

  constructor(private fb: FormBuilder, public readonly authService: AuthService, private router: Router) {
  }

  changeState(): void {
    this.isEmailCorrect = true;
  }

  onSubmit(): void {
    const credentials: Credentials = this.signupForm.getRawValue();
    this.authService.createWithEmail(credentials.email, credentials.password);
  }
}
