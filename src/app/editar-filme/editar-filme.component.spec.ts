import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarFilmeComponent } from './editar-filme.component';

describe('EditarFilmeComponent', () => {
  let component: EditarFilmeComponent;
  let fixture: ComponentFixture<EditarFilmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarFilmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
