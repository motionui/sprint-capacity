import { inject, Injectable } from '@angular/core';
import { child, Database, get, ref } from '@angular/fire/database';

import { from, map, Observable, take } from 'rxjs';

export type XmlNode =
  | string
  | {
      name: string;
      attributes?: Record<string, string>;
      children?: XmlNode[];
    };

@Injectable({
  providedIn: 'root',
})
export class ExercisesService {
  private database = inject(Database);
  private databaseRef = ref(this.database);

  private exercisesPath = 'xmlNodes';

  xmlNodes$ = (): Observable<XmlNode[]> =>
    from(get(child(this.databaseRef, this.exercisesPath))).pipe(
      take(1),
      map((snapshot) => {
        if (snapshot.exists()) {
          return snapshot.val();
        }

        return [];
      }),
    );
}
