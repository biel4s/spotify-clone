import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {AuthService} from "../auth.service";
import {CommonModule} from "@angular/common";
import {Router} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatIconModule
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  isPasswordSent: boolean = false;

  readonly resetForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
  })

  constructor(private readonly fb: FormBuilder, private readonly authService: AuthService, private router: Router) {}

  goToLoginPage(): void {
    this.router.navigate(['/login']).then();
  }

  changeState(): void {
    this.isPasswordSent = false;
  }

  onSubmit(): void {
    const credentials: {email: string} = this.resetForm.getRawValue();
    this.authService.resetPassword(credentials.email)
      .then((): void => {
        this.isPasswordSent = true;
      })
      .catch((error): void => {
        console.log(error)
      });
  }
}
