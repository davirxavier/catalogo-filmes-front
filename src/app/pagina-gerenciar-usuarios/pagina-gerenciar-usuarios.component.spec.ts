import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGerenciarUsuariosComponent } from './pagina-gerenciar-usuarios.component';

describe('PaginaGerenciarUsuariosComponent', () => {
  let component: PaginaGerenciarUsuariosComponent;
  let fixture: ComponentFixture<PaginaGerenciarUsuariosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaGerenciarUsuariosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaGerenciarUsuariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
