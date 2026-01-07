import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { debounce, email, Field, form, required, submit } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { take } from 'rxjs';
import { UserAuthService } from '../../../services/user-auth.service';

interface RegistrationFormModel {
  email: string;
  password: string;
  confirmPassword: string;
}

const registrationFormInitialValue: RegistrationFormModel = {
  email: '',
  password: '',
  confirmPassword: '',
};

@Component({
  selector: 'registration',
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    Field,
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Registration {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private userAuthService = inject(UserAuthService);

  protected formModel = signal<RegistrationFormModel>({
    ...registrationFormInitialValue,
  });
  protected registrationForm = form<RegistrationFormModel>(this.formModel, (schemaPath) => {
    // email
    debounce(schemaPath.email, 500);
    email(schemaPath.email, {
      message: 'Please enter a valid email address',
    });
    required(schemaPath.email, {
      message: 'Email is a required field',
    });

    // password
    required(schemaPath.password, {
      message: 'Password is a required field',
    });

    // confirmPassword
    required(schemaPath.confirmPassword, {
      message: 'Please re-enter password',
    });
  });

  protected onClickCancel = (): void => {
    this.registrationForm().reset({
      ...registrationFormInitialValue,
    });
  };

  protected onSubmit = (event: Event): void => {
    event.preventDefault();
    submit(this.registrationForm, async () => {
      const { email, password } = this.registrationForm().value();
      this.userAuthService
        .register$(email, password)
        .pipe(take(1))
        .subscribe({
          next: (credential) => {
            this.router.navigate(['/dashboard']).then(() => {
              this.registrationForm().reset({
                ...registrationFormInitialValue,
              });
            });
          },
          error: (error) => {
            this.registrationForm().reset({
              ...registrationFormInitialValue,
            });
            this.snackBar.open(error.message, 'OK', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          },
        });
    });
  };
}
