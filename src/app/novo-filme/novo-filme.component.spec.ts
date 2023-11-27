import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoFilmeComponent } from './novo-filme.component';

describe('NovoFilmeComponent', () => {
  let component: NovoFilmeComponent;
  let fixture: ComponentFixture<NovoFilmeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NovoFilmeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoFilmeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
