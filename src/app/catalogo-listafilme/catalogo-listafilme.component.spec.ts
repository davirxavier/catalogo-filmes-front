import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogoListafilmeComponent } from './catalogo-listafilme.component';

describe('CatalogoListafilmeComponent', () => {
  let component: CatalogoListafilmeComponent;
  let fixture: ComponentFixture<CatalogoListafilmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogoListafilmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogoListafilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
