import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnauthorizedComponent } from './unauthorized.component';

xdescribe('UnauthorizedComponent', () => {
   let component: UnauthorizedComponent;
   let fixture: ComponentFixture<UnauthorizedComponent>;

   beforeEach(async () => {
      await TestBed.configureTestingModule({
         imports: [UnauthorizedComponent]
      })
         .compileComponents();

      fixture = TestBed.createComponent(UnauthorizedComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
   });

   it('should create', () => {
      expect(component).toBeTruthy();
   });
});
