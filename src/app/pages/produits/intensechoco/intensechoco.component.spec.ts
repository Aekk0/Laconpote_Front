import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntensechocoComponent } from './intensechoco.component';

describe('IntensechocoComponent', () => {
  let component: IntensechocoComponent;
  let fixture: ComponentFixture<IntensechocoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntensechocoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IntensechocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
