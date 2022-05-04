import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusCodePageComponent } from './status-code-page.component';

describe('StatusCodePageComponent', () => {
  let component: StatusCodePageComponent;
  let fixture: ComponentFixture<StatusCodePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatusCodePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusCodePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
