import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Router } from "@angular/router";
import { RouteUrls } from "@chess-enums";
import { ChessUser } from "@chess-models";
import { ErrorService, UserService } from "@chess-services";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, exhaustMap, filter, from, map, of, switchMap, take, tap } from "rxjs";
import { authActions } from "../actions/auth.actions";

@Injectable()
export class AuthEffects {

   public register$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.register),
      exhaustMap(({ user }) => from(this.auth.createUserWithEmailAndPassword(user.email, user.password)).pipe(
         map(userCredential => ({
            id: userCredential.user!.uid!,
            name: user.name
         } as ChessUser)),
         switchMap(user => from(this.userService.createUser(user)).pipe(
            map(_ => authActions.loginSuccess({ user, doNavigate: true })),
            catchError(error => of(authActions.authenticationError({ error })))
         )),
         catchError(error => of(authActions.authenticationError({ error })))
      ))
   ));

   public login$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.login),
      exhaustMap(({ user }) => from(this.auth.signInWithEmailAndPassword(user.email, user.password)).pipe(
         map(userCredential => userCredential.user!.uid!),
         switchMap(id => this.userService.getUsername(id).pipe(
            map(name => authActions.loginSuccess({ user: { id, name }, doNavigate: true })),
            catchError(error => of(authActions.authenticationError({ error }))),
         )),
         catchError(error => of(authActions.authenticationError({ error }))),
      ))
   ));

   public logout$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.logout),
      exhaustMap(_ => from(this.auth.signOut()).pipe(
         map(_ => authActions.clearUser()),
         catchError(error => of(authActions.authenticationError({ error })))
      ))
   ));

   public loadAuthentication$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.loadAuthentication),
      switchMap(_ => this.auth.user.pipe(
         take(1),
         map(user => user!.uid!),
         switchMap(id => this.userService.getUsername(id).pipe(
            map(name => authActions.loginSuccess({ user: { id, name }, doNavigate: false })),
            catchError(error => of(authActions.authenticationError({ error }))),
         )),
         catchError(_ => of(authActions.clearUser()))
      ))
   ));

   public authenticationError$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.authenticationError),
      tap(({ error }) => this.errService.popupError(error))
   ), { dispatch: false });

   public authenticationSuccess$ = createEffect(() => this.actions$.pipe(
      ofType(authActions.loginSuccess),
      filter(({ doNavigate }) => doNavigate),
      tap(_ => this.router.navigateByUrl(RouteUrls.MENU))
   ), { dispatch: false });

   constructor(
      private actions$: Actions,
      private errService: ErrorService,
      private router: Router,
      private auth: AngularFireAuth,
      private userService: UserService
   ) { }
}
