import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoSearchBarComponent } from './catalogo-search-bar.component';

describe('CatalogoSearchBarComponent', () => {
  let component: CatalogoSearchBarComponent;
  let fixture: ComponentFixture<CatalogoSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
