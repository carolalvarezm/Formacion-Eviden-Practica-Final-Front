import { TestBed } from '@angular/core/testing';

import { SerieService } from './serie.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('SerieService', () => {
  let service: SerieService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SerieService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
