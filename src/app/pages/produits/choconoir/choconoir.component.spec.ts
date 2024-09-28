import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChoconoirComponent } from './choconoir.component';

describe('ChoconoirComponent', () => {
  let component: ChoconoirComponent;
  let fixture: ComponentFixture<ChoconoirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChoconoirComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChoconoirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
