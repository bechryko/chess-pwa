import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Clipboard } from '@angular/cdk/clipboard';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { TranslocoModule } from '@ngneat/transloco';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { UserInfoComponent } from './user-info.component';

describe('UserInfoComponent', () => {
   let component: UserInfoComponent;
   let fixture: ComponentFixture<UserInfoComponent>;
   let clipboardSpy: jasmine.SpyObj<Clipboard>;

   const testUsername = "test0123456789";
   let dummyAuthService: AuthService;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            UserInfoComponent,
            MatProgressSpinnerModule,
            MatSnackBarModule,
            TranslocoModule
         ],
         providers: [
            {
               provide: AuthService,
               useValue: {
                  isLoading$: of(false),
                  isUserLoggedIn$: of(true),
                  username$: of(testUsername)
               } as AuthService
            },
            {
               provide: Clipboard,
               useValue: jasmine.createSpyObj('Clipboard', ['copy'])
            }
         ]
      }).compileComponents();
      fixture = TestBed.createComponent(UserInfoComponent);
      component = fixture.componentInstance;
      dummyAuthService = TestBed.inject(AuthService);
      clipboardSpy = TestBed.inject(Clipboard) as jasmine.SpyObj<Clipboard>;
      clipboardSpy.copy.and.returnValue(true);
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('copies username on click', () => {
      const userInfoDivDe = fixture.debugElement.query(By.css('div'));
      userInfoDivDe.triggerEventHandler('click');
      expect(clipboardSpy.copy).toHaveBeenCalledWith(testUsername);
   });
});
