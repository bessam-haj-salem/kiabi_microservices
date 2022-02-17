import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAllComponent } from './client-all.component';

describe('ClientAllComponent', () => {
  let component: ClientAllComponent;
  let fixture: ComponentFixture<ClientAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientAllComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
