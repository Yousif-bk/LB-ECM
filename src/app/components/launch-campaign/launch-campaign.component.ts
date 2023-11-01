import { AuthService } from 'src/app/shared/services/auth.service';
import { UserRequestDetails } from './../../shared/model/UserRequestDetails';
import { AppService } from 'src/app/shared/services/app.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IBigData } from 'src/app/shared/model/IBigData';

@Component({
  selector: 'app-launch-campaign',
  templateUrl: './launch-campaign.component.html',
  styleUrls: ['./launch-campaign.component.scss'],
  standalone: true,
  imports:[
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
})
export class LaunchCampaignComponent implements OnInit {
  userRequestDetails: UserRequestDetails
  launchCampaignFormGroup: FormGroup
  bigData: IBigData [] =[];

  uiState = {
    isLoading: false,
    isSubmitting: false,
    isAlertVisible: false,
    errorMessage: '',
    successMessage: '',
    isSuccess: false,
    errorAlert: false,
    isFormVisual: false,
    isDisabled: true,
    locaionErrorMessage: ''
  }

  constructor(private appService: AppService, private router: Router, private formBuilder: FormBuilder, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserRequestDetails()
    this.initeForm();
  }

  initeForm() {
    this.launchCampaignFormGroup = this.formBuilder.group({
      campaignContent: [null, Validators.required],
      phoneNumber: [null, Validators.required],
    })
  }


  getUserRequestDetails() {
    this.uiState.isLoading = true
    const requestId = this.router.url.split('/user-launch-campaign/')[1];
    this.appService.getUserRequestDetail(requestId).subscribe({
      next: (response) => {
        this.userRequestDetails = response
        this.uiState.isLoading = false
        this.getBigdata(response.user.location.bigDataId)
        this.patchLaunchCampaignForm(response)
      },
      error: (error) => {
        this.uiState.isLoading = false
      }
    })
  }

  getBigdata(id: number) {
    this.appService.getBigdataDetails(id).subscribe({
      next: (response) => {
        this.bigData = response
      },
      error: (error) => {}
    })
  }

  patchLaunchCampaignForm(userRequestDetails: UserRequestDetails) {
   this.launchCampaignFormGroup.patchValue(userRequestDetails)
  }

  maskPhoneNumber(phoneNumber: string): string {
    if (phoneNumber && phoneNumber.length >= 1) {
      const lastFourDigits = phoneNumber.slice(-1);
      const maskedDigits = '*'.repeat(phoneNumber.length - 1);
      return maskedDigits + lastFourDigits;
    } else {
      return phoneNumber;
    }
  }
  launchCampaign(){
    this.uiState.isLoading = true;
    this.appService.launchCampaign(this.launchCampaignFormGroup.value).subscribe({
      next:(res) =>{
        this.uiState.isLoading = false;
        this.uiState.successMessage = "Campaign successfully launched"
        this.uiState.isSuccess = true;
        setTimeout(() => {
          this.uiState.isSuccess = false;
        }, 2000);
      },
      error:(err) =>{
        this.uiState.errorMessage = err.statusMessage;
        this.uiState.isLoading = false;
        this.uiState.errorAlert = true;
        setTimeout(() => {
          this.uiState.errorAlert = false;
        }, 2000);
      }
    })
  }
}
