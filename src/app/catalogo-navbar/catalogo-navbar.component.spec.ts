import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoNavbarComponent } from './catalogo-navbar.component';

describe('CatalogoNavbarComponent', () => {
  let component: CatalogoNavbarComponent;
  let fixture: ComponentFixture<CatalogoNavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoNavbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
