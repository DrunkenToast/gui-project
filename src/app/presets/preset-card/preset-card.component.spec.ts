import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresetCardComponent } from './preset-card.component';

describe('CardtestComponent', () => {
  let component: PresetCardComponent;
  let fixture: ComponentFixture<PresetCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PresetCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresetCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
