import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosSComponent } from './productos-s.component';

describe('ProductosSComponent', () => {
  let component: ProductosSComponent;
  let fixture: ComponentFixture<ProductosSComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosSComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosSComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
