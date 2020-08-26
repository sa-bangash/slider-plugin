import { TestBed } from '@angular/core/testing';

import { SliderPluginService } from './slider-plugin.service';

describe('SliderPluginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SliderPluginService = TestBed.get(SliderPluginService);
    expect(service).toBeTruthy();
  });
});
