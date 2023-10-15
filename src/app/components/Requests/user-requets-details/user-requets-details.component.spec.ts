import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserRequetsDetailsComponent } from './user-requets-details.component';

describe('UserRequetsListComponent', () => {
  let component: UserRequetsDetailsComponent;
  let fixture: ComponentFixture<UserRequetsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserRequetsDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserRequetsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
