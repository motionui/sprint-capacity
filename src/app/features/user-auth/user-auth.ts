import { BreakpointObserver } from '@angular/cdk/layout';
import { NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';

import { map } from 'rxjs';

@Component({
  selector: 'user-auth',
  imports: [RouterOutlet, NgOptimizedImage],
  templateUrl: './user-auth.html',
  styleUrl: './user-auth.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserAuth {
  private breakpointObserver = inject(BreakpointObserver);

  protected overlay = toSignal(this.breakpointObserver.observe('(max-width: 1024px)').pipe(map((result) => result.matches)), {
    initialValue: false,
  });
}
