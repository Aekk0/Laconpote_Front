import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesShopComponent } from './shop.component';

describe('CookiesShopComponent', () => {
  let component: CookiesShopComponent;
  let fixture: ComponentFixture<CookiesShopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesShopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookiesShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
