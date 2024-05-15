import { TestBed } from '@angular/core/testing';

import { ProductoService } from './producto.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductoService', () => {
  let service: ProductoService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(ProductoService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
