import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesGalerieComponent } from './galerie.component';

describe('GalerieComponent', () => {
  let component: CookiesGalerieComponent;
  let fixture: ComponentFixture<CookiesGalerieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesGalerieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookiesGalerieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
