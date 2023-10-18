import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { RouteUrls } from 'src/app/shared/enums/routes';
import { NotFoundComponent } from './not-found.component';

describe('NotFoundComponent', () => {
   let component: NotFoundComponent;
   let fixture: ComponentFixture<NotFoundComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [
            NotFoundComponent
         ],
         providers: [
            provideRouter([{
               path: '**',
               component: NotFoundComponent
            }])
         ]
      }).compileComponents().then(async () => {
         const harness = await RouterTestingHarness.create();
         component = await harness.navigateByUrl('', NotFoundComponent);
      });

      fixture = TestBed.createComponent(NotFoundComponent);
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });

   it('should navigate back to the menu', fakeAsync(() => {
      const linkPDe = fixture.debugElement.query(By.css("p.link"));
      linkPDe.triggerEventHandler('click', { button: 0 });
      tick();
      expect(location.pathname).toContain(RouteUrls.MENU);
   }));
});
