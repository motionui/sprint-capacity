import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Page } from '@motionui/ui-lib';

@Component({
  selector: 'teams',
  imports: [Page],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Teams {}
