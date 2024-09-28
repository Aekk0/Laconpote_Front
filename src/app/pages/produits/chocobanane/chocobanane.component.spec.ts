import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocobananeComponent } from './chocobanane.component';

describe('ChocobananeComponent', () => {
  let component: ChocobananeComponent;
  let fixture: ComponentFixture<ChocobananeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocobananeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChocobananeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
