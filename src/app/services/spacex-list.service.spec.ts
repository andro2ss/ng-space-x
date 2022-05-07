import { TestBed } from '@angular/core/testing';

import { SpacexListService } from './spacex-list.service';

describe('SpacexListService', () => {
  let service: SpacexListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpacexListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
