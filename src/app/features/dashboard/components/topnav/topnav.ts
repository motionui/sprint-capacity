import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { MenuItem } from '@motionui/ui-lib';

@Component({
  selector: 'topnav',
  imports: [MatToolbarModule, MatIconModule, RouterLink, RouterLinkActive, MatListModule],
  templateUrl: './topnav.html',
  styleUrl: './topnav.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Topnav {
  public menuItems = input.required<MenuItem[]>();
}
