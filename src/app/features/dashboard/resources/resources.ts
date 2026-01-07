import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { Page } from '@motionui/ui-lib';

@Component({
  selector: 'resources',
  imports: [CommonModule, Page],
  templateUrl: './resources.html',
  styleUrl: './resources.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Resources {}
