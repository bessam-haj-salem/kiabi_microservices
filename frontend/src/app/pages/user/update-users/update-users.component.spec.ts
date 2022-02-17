import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUsersComponent } from './update-users.component';

describe('UpdateUsersComponent', () => {
  let component: UpdateUsersComponent;
  let fixture: ComponentFixture<UpdateUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateUsersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
