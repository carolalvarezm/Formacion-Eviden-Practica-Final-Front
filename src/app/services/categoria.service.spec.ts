import { TestBed } from '@angular/core/testing';

import { CategoriaService } from './categoria.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('Testeando el servicio CategoriaService', () => {
  let service: CategoriaService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(CategoriaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
