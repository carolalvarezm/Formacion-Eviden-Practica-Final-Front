import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  let service: UserService;
  let httpTestingController: HttpTestingController;
  beforeEach(() => {

    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(UserService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
