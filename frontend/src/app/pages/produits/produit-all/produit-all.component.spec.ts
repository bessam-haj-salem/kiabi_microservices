import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProduitAllComponent } from './produit-all.component';

describe('ProduitAllComponent', () => {
  let component: ProduitAllComponent;
  let fixture: ComponentFixture<ProduitAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProduitAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProduitAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
