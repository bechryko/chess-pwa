import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamemodeChooserComponent } from './gamemode-chooser.component';

describe('GamemodeChooserComponent', () => {
  let component: GamemodeChooserComponent;
  let fixture: ComponentFixture<GamemodeChooserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamemodeChooserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamemodeChooserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
