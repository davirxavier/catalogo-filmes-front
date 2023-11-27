import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoListacategoriaComponent } from './catalogo-listacategoria.component';

describe('CatalogoListacategoriaComponent', () => {
  let component: CatalogoListacategoriaComponent;
  let fixture: ComponentFixture<CatalogoListacategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoListacategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoListacategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
