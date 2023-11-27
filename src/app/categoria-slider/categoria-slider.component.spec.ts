import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriaSliderComponent } from './categoria-slider.component';

describe('CategoriaSliderComponent', () => {
  let component: CategoriaSliderComponent;
  let fixture: ComponentFixture<CategoriaSliderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriaSliderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriaSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
