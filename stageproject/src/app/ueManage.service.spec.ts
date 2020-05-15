/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UeManageService } from './ueManage.service';

describe('Service: UeManage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UeManageService]
    });
  });

  it('should ...', inject([UeManageService], (service: UeManageService) => {
    expect(service).toBeTruthy();
  }));
});
