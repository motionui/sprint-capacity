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

type LoginFormModel = {
  email: string;
  password: string;
};

const loginFormInitialValue: LoginFormModel = {
  email: '',
  password: '',
};

@Component({
  selector: 'login',
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
  templateUrl: './login.html',
  styleUrl: './login.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Login {
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);
  private userAuthService = inject(UserAuthService);

  protected formModel = signal<LoginFormModel>({
    ...loginFormInitialValue,
  });
  protected loginForm = form<LoginFormModel>(this.formModel, (schemaPath) => {
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
  });

  protected onSubmit = (event: Event): void => {
    event.preventDefault();
    submit(this.loginForm, async () => {
      const { email, password } = this.loginForm().value();
      this.userAuthService
        .login$(email, password)
        .pipe(take(1))
        .subscribe({
          next: () => {
            this.router.navigate(['dashboard', 'teams']).then(() => {
              this.loginForm().reset({
                ...loginFormInitialValue,
              });
            });
          },
          error: (error) => {
            this.loginForm().reset({
              ...loginFormInitialValue,
            });
            this.snackBar.open(error.message, 'OK', {
              horizontalPosition: 'right',
              verticalPosition: 'bottom',
            });
          },
        });
    });
  };

  protected onClickCancel = (): void => {
    this.loginForm().reset({
      ...loginFormInitialValue,
    });
  };
}
