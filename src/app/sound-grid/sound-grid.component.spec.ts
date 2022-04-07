import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoundGridComponent } from './sound-grid.component';

describe('MainComponent', () => {
  let component: SoundGridComponent;
  let fixture: ComponentFixture<SoundGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoundGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SoundGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
