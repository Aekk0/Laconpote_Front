import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FraisicroqComponent } from './fraisicroq.component';

describe('FraisicroqComponent', () => {
  let component: FraisicroqComponent;
  let fixture: ComponentFixture<FraisicroqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FraisicroqComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FraisicroqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
