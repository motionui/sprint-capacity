import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule, RouterOutlet } from '@angular/router';

import { MenuItem } from '@motionui/ui-lib';
import { Sidenav } from './components/sidenav/sidenav';
import { Topnav } from './components/topnav/topnav';
import { sidenavMenuItems, topnavMenuItems } from './dashboard.constants';

@Component({
  selector: 'dashboard',
  imports: [RouterOutlet, RouterModule, MatButtonModule, MatMenuModule, Topnav, Sidenav],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  protected topnavMenuItems = signal<MenuItem[]>(topnavMenuItems);
  protected sidenavMenuItems = signal<MenuItem[]>(sidenavMenuItems);
}
