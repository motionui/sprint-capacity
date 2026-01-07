import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { Page } from '@motionui/ui-lib';
import { ExercisesService } from '../../../services/exercises.service';

@Component({
  selector: 'teams',
  imports: [Page],
  templateUrl: './teams.html',
  styleUrl: './teams.scss',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Teams {
  protected exercisesService = inject(ExercisesService);
}
