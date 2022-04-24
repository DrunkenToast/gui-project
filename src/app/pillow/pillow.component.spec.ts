import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PillowComponent } from './pillow.component';

describe('PillowComponent', () => {
  let component: PillowComponent;
  let fixture: ComponentFixture<PillowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PillowComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PillowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
