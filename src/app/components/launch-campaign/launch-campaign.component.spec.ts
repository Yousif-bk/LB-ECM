import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchCampaignComponent } from './launch-campaign.component';

describe('LaunchCampaignComponent', () => {
  let component: LaunchCampaignComponent;
  let fixture: ComponentFixture<LaunchCampaignComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchCampaignComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LaunchCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
