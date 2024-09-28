import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DelicepapayeComponent } from './delicepapaye.component';

describe('DelicepapayeComponent', () => {
  let component: DelicepapayeComponent;
  let fixture: ComponentFixture<DelicepapayeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DelicepapayeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DelicepapayeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
