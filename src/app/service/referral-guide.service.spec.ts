import { TestBed } from '@angular/core/testing';

import { ReferralGuideService } from './referral-guide.service';

describe('ReferralGuideService', () => {
  let service: ReferralGuideService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReferralGuideService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
