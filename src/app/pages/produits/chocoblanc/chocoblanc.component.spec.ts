import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocoblancComponent } from './chocoblanc.component';

describe('ChocoblancComponent', () => {
  let component: ChocoblancComponent;
  let fixture: ComponentFixture<ChocoblancComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocoblancComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChocoblancComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
