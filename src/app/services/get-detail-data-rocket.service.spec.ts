import { TestBed } from '@angular/core/testing';

import { GetDetailDataRocketService } from './get-detail-data-rocket.service';

describe('GetDetailDataRocketService', () => {
  let service: GetDetailDataRocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDetailDataRocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
