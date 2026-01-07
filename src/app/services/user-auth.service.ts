import { inject, Injectable } from '@angular/core';
import {
  Auth,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential,
} from '@angular/fire/auth';

import { from, Observable, ReplaySubject, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserAuthService {
  private auth = inject(Auth);

  private userSubject = new ReplaySubject<User | null>(1);
  public user$ = this.userSubject.asObservable();

  constructor() {
    onAuthStateChanged(this.auth, (user) => {
      this.userSubject.next(user);
    });
  }

  isAuthenticated = (): boolean => !!this.auth.currentUser;

  register$ = (email: string, password: string): Observable<UserCredential> =>
    from(createUserWithEmailAndPassword(this.auth, email, password));

  login$ = (email: string, password: string): Observable<UserCredential> =>
    from(setPersistence(this.auth, browserLocalPersistence)).pipe(
      switchMap(() => signInWithEmailAndPassword(this.auth, email, password)),
    );

  logout$ = (): Observable<void> => from(signOut(this.auth));
}
