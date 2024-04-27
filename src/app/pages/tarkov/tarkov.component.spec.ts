import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarkovComponent } from './tarkov.component';

describe('TarkovComponent', () => {
  let component: TarkovComponent;
  let fixture: ComponentFixture<TarkovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarkovComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarkovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
