import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesIndexComponent } from './index.component';

describe('CookiesIndexComponent', () => {
  let component: CookiesIndexComponent;
  let fixture: ComponentFixture<CookiesIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookiesIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CookiesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
