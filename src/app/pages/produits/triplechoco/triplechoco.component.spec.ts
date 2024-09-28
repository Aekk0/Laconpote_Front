import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TriplechocoComponent } from './triplechoco.component';

describe('TriplechocoComponent', () => {
  let component: TriplechocoComponent;
  let fixture: ComponentFixture<TriplechocoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TriplechocoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TriplechocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
