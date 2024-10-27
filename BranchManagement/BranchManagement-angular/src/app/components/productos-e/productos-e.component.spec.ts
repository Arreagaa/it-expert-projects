import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosEComponent } from './productos-e.component';

describe('ProductosEComponent', () => {
  let component: ProductosEComponent;
  let fixture: ComponentFixture<ProductosEComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductosEComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
