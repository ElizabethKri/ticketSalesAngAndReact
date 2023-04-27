import { TestBed } from '@angular/core/testing';

import { StatisticRestService } from './statistic-rest.service';

describe('StatisticRestService', () => {
  let service: StatisticRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
