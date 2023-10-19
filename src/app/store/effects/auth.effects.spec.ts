import { TestBed } from "@angular/core/testing";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { provideMockActions } from "@ngrx/effects/testing";
import { Action } from "@ngrx/store";
import { cold, hot } from "jasmine-marbles";
import { Observable, of } from "rxjs";
import { ErrorService } from "src/app/shared/services/error.service";
import { UserService } from "src/app/shared/services/user.service";
import { authActions } from "../actions/auth.actions";
import { AuthEffects } from "./auth.effects";

describe('AuthEffects', () => {
   let authSpy: jasmine.SpyObj<AngularFireAuth>;
   let effects: AuthEffects;
   let actions$ = new Observable<Action>;

   const mockUserService = {
      makeUsername(uid: string): string {
         return "name-of-" + uid;
      },
      getUsername(uid: string): Observable<string> {
         return of(this.makeUsername(uid));
      }
   };

   const testUserId = "testid666";
   const testUserCredential = { user: { uid: testUserId } } as any;

   beforeEach(() => {
      authSpy = jasmine.createSpyObj('AngularFireAuth', ['createUserWithEmailAndPassword', 'signInWithEmailAndPassword', 'signOut'], {
         user: of({ uid: testUserId } as any)
      });
      TestBed.configureTestingModule({
         providers: [
            AuthEffects,
            provideMockActions(() => actions$),
            {
               provide: UserService,
               useValue: mockUserService
            },
            {
               provide: AngularFireAuth,
               useValue: authSpy
            },
            {
               provide: ErrorService,
               useValue: { popupError() {} }
            }
         ]
      });

      effects = TestBed.inject(AuthEffects);
      authSpy.createUserWithEmailAndPassword.and.resolveTo(testUserCredential);
      authSpy.signInWithEmailAndPassword.and.resolveTo(testUserCredential);
      authSpy.signOut.and.resolveTo();
   });

   describe('loadAuthentication$', () => {
      it('should load user data', () => {
         actions$ = hot('a', { a: authActions.loadAuthentication() });
         const expected = cold('b', { b: authActions.loginSuccess({ 
            user: { 
               id: testUserId, 
               name: mockUserService.makeUsername(testUserId) 
            },
            doNavigate: false
         }) });
         expect(effects.loadAuthentication$).toBeObservable(expected);
      });
   });
});