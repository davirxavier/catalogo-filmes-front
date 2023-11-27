import { TestBed } from '@angular/core/testing';

import { FilmeSearchService } from './filme-search.service';

describe('SearchService', () => {
  let service: FilmeSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilmeSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
