import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrousticocoComponent } from './crousticoco.component';

describe('CrousticocoComponent', () => {
  let component: CrousticocoComponent;
  let fixture: ComponentFixture<CrousticocoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrousticocoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrousticocoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
