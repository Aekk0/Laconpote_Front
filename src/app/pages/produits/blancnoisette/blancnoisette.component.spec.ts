import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlancnoisetteComponent } from './blancnoisette.component';

describe('BlancnoisetteComponent', () => {
  let component: BlancnoisetteComponent;
  let fixture: ComponentFixture<BlancnoisetteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlancnoisetteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BlancnoisetteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
