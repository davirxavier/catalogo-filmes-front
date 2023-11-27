import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoTableComponent } from './catalogo-table.component';

describe('CatalogoTableComponent', () => {
  let component: CatalogoTableComponent;
  let fixture: ComponentFixture<CatalogoTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
