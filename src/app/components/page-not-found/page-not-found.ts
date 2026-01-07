import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'page-not-found',
  imports: [MatCardModule],
  templateUrl: './page-not-found.html',
  styleUrl: './page-not-found.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PageNotFound {}
