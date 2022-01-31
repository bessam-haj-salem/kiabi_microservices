import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutClientComponent } from './ajout-client.component';

describe('AjoutClientComponent', () => {
  let component: AjoutClientComponent;
  let fixture: ComponentFixture<AjoutClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjoutClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AjoutClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
