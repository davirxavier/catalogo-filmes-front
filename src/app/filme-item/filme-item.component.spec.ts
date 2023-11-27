import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmeItemComponent } from './filme-item.component';

describe('FilmeItemComponent', () => {
  let component: FilmeItemComponent;
  let fixture: ComponentFixture<FilmeItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilmeItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilmeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
