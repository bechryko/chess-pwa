import { Injectable } from '@angular/core';
import { authActions } from '@chess-store/actions';
import { selectIsLoading, selectIsLoggedIn, selectUsername } from '@chess-store/selectors';
import { AppState } from '@chess-store/states';
import { Store } from '@ngrx/store';
import { Observable, distinctUntilChanged, filter, map, tap } from 'rxjs';
import { AuthUser, AuthUserWithoutName } from '../models/authUsers';
import { multicast } from '../operators/multicast';

@Injectable({
   providedIn: 'root'
})
export class AuthService {

   public isUserLoggedIn$: Observable<boolean>;
   public username$: Observable<string>;
   public isLoading$: Observable<boolean>;

   constructor(
      private store: Store<AppState>
   ) {
      this.isUserLoggedIn$ = this.store.select(selectIsLoggedIn).pipe(
         distinctUntilChanged(),
         multicast()
      );
      this.username$ = this.store.select(selectUsername).pipe(
         tap(name => {
            if(!name) {
               this.store.dispatch(authActions.loadAuthentication());
            }
         }),
         filter(name => !!name),
         map(name => name as string),
         distinctUntilChanged(),
         multicast()
      );
      this.isLoading$ = this.store.select(selectIsLoading).pipe(
         distinctUntilChanged(),
         multicast()
      ); 
   }

   public login(user: AuthUserWithoutName): void {
      this.store.dispatch(authActions.login({ user }));
   }

   public register(user: AuthUser): void {
      this.store.dispatch(authActions.register({ user }));
   }

   public logout(): void {
      this.store.dispatch(authActions.logout());
   }
}
