import { Component } from '@angular/core';
import {FooterComponent} from "../../shared/components/footer/footer.component";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButton} from "@angular/material/button";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'app-password-reset',
  standalone: true,
  imports: [
    FooterComponent,
    FormsModule,
    MatButton,
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule
  ],
  templateUrl: './password-reset.component.html',
  styleUrl: './password-reset.component.scss'
})
export class PasswordResetComponent {
  readonly resetForm = this.fb.nonNullable.group({
    account: ['', [Validators.email, Validators.required]],
  })

  constructor(private readonly fb: FormBuilder) {}

  onSubmit(): void {

  }
}
