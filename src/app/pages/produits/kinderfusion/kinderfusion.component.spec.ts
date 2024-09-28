import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KinderfusionComponent } from './kinderfusion.component';

describe('KinderfusionComponent', () => {
  let component: KinderfusionComponent;
  let fixture: ComponentFixture<KinderfusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KinderfusionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KinderfusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
