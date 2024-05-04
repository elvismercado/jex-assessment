import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeeplinkComponent } from './deeplink.component';

describe('DeeplinkComponent', () => {
  let component: DeeplinkComponent;
  let fixture: ComponentFixture<DeeplinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeeplinkComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeeplinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
