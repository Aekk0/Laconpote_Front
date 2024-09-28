import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChocolaitComponent } from './chocolait.component';

describe('ChocolaitComponent', () => {
  let component: ChocolaitComponent;
  let fixture: ComponentFixture<ChocolaitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChocolaitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ChocolaitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
