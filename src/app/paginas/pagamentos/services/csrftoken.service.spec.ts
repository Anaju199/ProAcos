import { TestBed } from '@angular/core/testing';

import { CSRFTokenService } from './csrftoken.service';

describe('CSRFTokenService', () => {
  let service: CSRFTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CSRFTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
