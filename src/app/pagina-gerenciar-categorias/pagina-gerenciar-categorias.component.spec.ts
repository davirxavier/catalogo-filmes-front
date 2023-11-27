import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGerenciarCategoriasComponent } from './pagina-gerenciar-categorias.component';

describe('PaginaGerenciarCategoriasComponent', () => {
  let component: PaginaGerenciarCategoriasComponent;
  let fixture: ComponentFixture<PaginaGerenciarCategoriasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaGerenciarCategoriasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaGerenciarCategoriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
