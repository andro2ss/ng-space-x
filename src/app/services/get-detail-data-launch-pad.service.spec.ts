import { TestBed } from '@angular/core/testing';

import { GetDetailDataLaunchPadService } from './get-detail-data-launch-pad.service';

describe('GetDetailDataLaunchPadService', () => {
  let service: GetDetailDataLaunchPadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetDetailDataLaunchPadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
