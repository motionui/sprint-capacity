import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MenuItem } from '@motionui/ui-lib';

@Component({
  selector: 'sidenav',
  imports: [CommonModule, MatIconModule, MatSidenavModule, MatListModule, RouterLink, RouterLinkActive],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidenav {
  public menuItems = input.required<MenuItem[]>();

  protected isCollapsed = signal<boolean>(false);
}
