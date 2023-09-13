import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject, Observable, ReplaySubject, distinctUntilChanged, filter, map, share, tap } from 'rxjs';
import { ChessUser } from '../models/ChessUser';

@Injectable({
   providedIn: 'root'
})
export class AuthService {
   private loggedInUser$: Observable<ChessUser | null>;
   private loadingHandlerSubject$ = new BehaviorSubject<boolean>(true);

   public isUserLoggedIn$: Observable<boolean>;
   public username$: Observable<string>;
   public isLoading$: Observable<boolean>;

   constructor(private auth: AngularFireAuth) {
      this.loggedInUser$ = this.auth.user.pipe(
         map(
            value => value ? ({
               id: value?.uid ?? "",
               name: "Unknown user"
            }) : null
         ),
         tap(_ => this.loadingHandlerSubject$.next(false)),
         share({
            connector: () => new ReplaySubject(1)
         })
      );
      this.isUserLoggedIn$ = this.loggedInUser$.pipe(
         map(user => !!user),
         distinctUntilChanged(),
         share({
            connector: () => new ReplaySubject(1)
         })
      );
      this.username$ = this.loggedInUser$.pipe(
         filter(user => user !== null),
         map(user => user!.name),
         distinctUntilChanged(),
         share({
            connector: () => new ReplaySubject(1)
         })
      );
      this.isLoading$ = this.loadingHandlerSubject$.pipe(
         distinctUntilChanged(),
         share({
            connector: () => new ReplaySubject(1)
         })
      );
   }

   public login(email: string, password: string) {
      this.loadingHandlerSubject$.next(true);
      return this.auth.signInWithEmailAndPassword(email, password);
   }

   public register(email: string, password: string) {
      this.loadingHandlerSubject$.next(true);
      return this.auth.createUserWithEmailAndPassword(email, password);
   }

   public logout(): Promise<void> {
      this.loadingHandlerSubject$.next(true);
      return this.auth.signOut();
   }

   public errorAuth(error: Error): void {
      this.loadingHandlerSubject$.next(false);
      console.error(error.message);
   }
}
