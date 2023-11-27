import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoDropdownComponent } from './catalogo-dropdown.component';

describe('CatalogoDropdownComponent', () => {
  let component: CatalogoDropdownComponent;
  let fixture: ComponentFixture<CatalogoDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
