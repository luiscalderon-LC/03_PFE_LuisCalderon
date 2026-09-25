import { TestBed } from '@angular/core/testing';

import { Personaje } from './personaje';

describe('Personaje', () => {
  let service: Personaje;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Personaje);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
