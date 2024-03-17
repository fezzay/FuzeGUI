import { TestBed } from '@angular/core/testing';

import { KubeService } from './kube.service';

describe('KubeService', () => {
  let service: KubeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KubeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
