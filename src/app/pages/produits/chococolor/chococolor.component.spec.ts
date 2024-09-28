import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChococolorComponent } from './chococolor.component';

describe('ChococolorComponent', () => {
  let component: ChococolorComponent;
  let fixture: ComponentFixture<ChococolorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChococolorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChococolorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
