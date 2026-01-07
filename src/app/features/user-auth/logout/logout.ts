import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';

import { delay, finalize, take } from 'rxjs';
import { UserAuthService } from '../../../services/user-auth.service';

@Component({
  selector: 'logout',
  imports: [MatCardModule, MatProgressSpinnerModule],
  templateUrl: './logout.html',
  styleUrl: './logout.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Logout implements OnInit {
  protected userAuthService = inject(UserAuthService);
  protected router = inject(Router);

  ngOnInit(): void {
    if (!this.userAuthService.isAuthenticated()) {
      this.redirectToLogin();

      return;
    }

    this.userAuthService
      .logout$()
      .pipe(
        take(1),
        delay(1000),
        finalize(() => {
          this.redirectToLogin();
        }),
      )
      .subscribe();
  }

  private redirectToLogin = (): void => {
    this.router.navigateByUrl('/user-auth/login', {
      replaceUrl: true,
    });
  };
}
