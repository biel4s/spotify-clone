import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";

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
        NgIf
    ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  readonly signupForm = this.fb.nonNullable.group({
    account: ['', [Validators.required, Validators.email]],
  })

  constructor(private fb: FormBuilder, public readonly authService: AuthService, private router: Router) {
  }

  onSubmit(): void {

  }
}
