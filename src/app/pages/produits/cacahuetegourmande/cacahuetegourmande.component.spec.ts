import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CacahuetegourmandeComponent } from './cacahuetegourmande.component';

describe('CacahuetegourmandeComponent', () => {
  let component: CacahuetegourmandeComponent;
  let fixture: ComponentFixture<CacahuetegourmandeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CacahuetegourmandeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CacahuetegourmandeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
