import { TestBed } from '@angular/core/testing';

import { MarcaService } from './marca.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('MarcaService', () => {
  let service: MarcaService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(MarcaService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
