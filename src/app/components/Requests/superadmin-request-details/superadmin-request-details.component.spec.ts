import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperadminRequestDetailsComponent } from './superadmin-request-details.component';

describe('SuperadminRequestDetailsComponent', () => {
  let component: SuperadminRequestDetailsComponent;
  let fixture: ComponentFixture<SuperadminRequestDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperadminRequestDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuperadminRequestDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
