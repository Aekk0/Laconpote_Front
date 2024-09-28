import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocoplaisirComponent } from './chocoplaisir.component';

describe('ChocoplaisirComponent', () => {
  let component: ChocoplaisirComponent;
  let fixture: ComponentFixture<ChocoplaisirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocoplaisirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChocoplaisirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
