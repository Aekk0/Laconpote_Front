import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarkovIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: TarkovIndexComponent;
  let fixture: ComponentFixture<TarkovIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarkovIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TarkovIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
