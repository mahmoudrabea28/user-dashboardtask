import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserListPage2Component } from './user-list-page2.component';

describe('UserListPage2Component', () => {
  let component: UserListPage2Component;
  let fixture: ComponentFixture<UserListPage2Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserListPage2Component]
    });
    fixture = TestBed.createComponent(UserListPage2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
