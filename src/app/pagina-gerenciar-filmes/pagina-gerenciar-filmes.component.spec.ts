import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaGerenciarFilmesComponent } from './pagina-gerenciar-filmes.component';

describe('PaginaGerenciarFilmesComponent', () => {
  let component: PaginaGerenciarFilmesComponent;
  let fixture: ComponentFixture<PaginaGerenciarFilmesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaGerenciarFilmesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaGerenciarFilmesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
