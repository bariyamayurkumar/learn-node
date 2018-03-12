import { TestBed, inject } from '@angular/core/testing';

import { MyAppServiceService } from './my-app-service.service';

describe('MyAppServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyAppServiceService]
    });
  });

  it('should be created', inject([MyAppServiceService], (service: MyAppServiceService) => {
    expect(service).toBeTruthy();
  }));
});
