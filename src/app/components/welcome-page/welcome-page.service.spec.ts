import { TestBed } from '@angular/core/testing';

import { WelcomePageService } from './welcome-page.service';

describe('WelcomePageService', () => {
  let service: WelcomePageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WelcomePageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
