import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginaPreferenciasComponent } from './pagina-preferencias.component';

describe('PaginaPreferenciasComponent', () => {
  let component: PaginaPreferenciasComponent;
  let fixture: ComponentFixture<PaginaPreferenciasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaginaPreferenciasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginaPreferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
