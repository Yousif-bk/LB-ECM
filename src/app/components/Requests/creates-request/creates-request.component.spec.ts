import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesRequestComponent } from './creates-request.component';

describe('CreatesRequestComponent', () => {
  let component: CreatesRequestComponent;
  let fixture: ComponentFixture<CreatesRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatesRequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatesRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
