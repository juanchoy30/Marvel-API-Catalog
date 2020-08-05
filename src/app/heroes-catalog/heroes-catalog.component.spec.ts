import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroesCatalogComponent } from './heroes-catalog.component';

describe('HeroesCatalogComponent', () => {
  let component: HeroesCatalogComponent;
  let fixture: ComponentFixture<HeroesCatalogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeroesCatalogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeroesCatalogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
