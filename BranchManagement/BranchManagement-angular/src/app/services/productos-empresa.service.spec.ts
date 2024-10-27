import { TestBed } from '@angular/core/testing';

import { ProductosEmpresaService } from './productos-empresa.service';

describe('ProductosEmpresaService', () => {
  let service: ProductosEmpresaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosEmpresaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
