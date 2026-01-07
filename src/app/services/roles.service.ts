import { inject, Injectable } from '@angular/core';
import { Database, onValue, push, ref, remove, update } from '@angular/fire/database';

import { from, Observable } from 'rxjs';

export type Role = {
  id?: string;
  name: string;
  description: string;
};

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private database = inject(Database);

  private rolesPath = 'sprint-planning/roles';

  getRoles$ = (): Observable<Role[]> => {
    return new Observable<Role[]>((observer) => {
      const rolesRef = ref(this.database, this.rolesPath);

      // set up a live listener so any changes are reflected in real-time
      // this causes patchState to be called in the signal store
      const unsubscribe = onValue(rolesRef, (snapshot) => {
        const data = snapshot.val() ?? {};
        observer.next(
          Object.entries(data).map(([id, value]) => ({
            id,
            ...(value as Omit<Role, 'id'>),
          })),
        );
      });

      return () => unsubscribe();
    });
  };

  addRole$ = (role: Role): Observable<string> => {
    const newRef = push(ref(this.database, this.rolesPath), role);
    return from(Promise.resolve(newRef.key));
  };

  updateRole$ = (role: Role): Observable<void> => {
    return from(update(ref(this.database, `${this.rolesPath}/${role.id}`), role as Omit<Role, 'id'>));
  };

  deleteRole$ = (role: Role): Observable<void> => {
    return from(remove(ref(this.database, `${this.rolesPath}/${role.id}`)));
  };
}
