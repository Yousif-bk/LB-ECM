import { AuthService } from 'src/app/shared/services/auth.service';
import { AppService } from './../../../shared/services/app.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocallyStoredItemsKeys } from 'src/app/shared/model/LocallyStoredItemsKeys';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/model/AppRoutes';
import { LaunchCampaign } from 'src/app/shared/model/LaunchCampaign';

@Component({
  selector: 'app-creates-request',
  templateUrl: './creates-request.component.html',
  styleUrls: ['./creates-request.component.scss']
})
export class CreatesRequestComponent {
  hasRequest = false;
  constructor(private appService: AppService,
    private router: Router,
    private formBuilder: FormBuilder) { }

  emirates = [
    { value: 'DXB', label: 'DXB' },
    { value: 'AUH', label: 'AUH' },
    { value: 'SHJ', label: 'SHJ' }
  ]
  senderAddresses = [
    { value: 'engageX', label: 'engageX' },
  ]
  areas = [
    { value: 'Dubai Mrina', label: 'Dubai Marina', emirate: 'DXB' },
    { value: 'Business bay', label: 'Business Bay', emirate: 'DXB' },
    { value: 'YasIsland', label: 'Yas Island', emirate: 'AUH' },
    { value: 'Al Reem', label: 'Al Reem', emirate: 'AUH' },
    { value: 'Al Falaj', label: 'Al Falaj', emirate: 'SHJ' },
    { value: 'Alnahd', label: 'Alnahda', emirate: 'SHJ' }
  ];

  selectedEmirate: string;
  filteredAreas: any[];

  uiState = {
    isLoading: false,
    isSubmitting: false,
    isAlertVisible: false,
    errorMessage: '',
    successMessage: '',
    isSuccess: false,
    isFormVisual: false,
    isDisabled: true,
    locaionErrorMessage: ''
  }

  // Forms
  createRequestForm: FormGroup
  locationtForm: FormGroup

  ngOnInit(): void {
    this.initeForm(),
    this.getUserInfo();
  }



  getUserInfo() {
    const userJson = localStorage.getItem(LocallyStoredItemsKeys.User)
    if (userJson !== null) {
      const user = JSON.parse(userJson);
      this.hasRequest = user.hasRequests,
      this.createRequestForm.get('userId')?.setValue(user?.userId)
      this.locationtForm.get('userId')?.setValue(user?.userId)
      this.createRequestForm.get('mobile')?.setValue(user?.phoneNumber)
      this.createRequestForm.get('customerName')?.setValue(user?.name)
      this.createRequestForm.get('email')?.setValue(user?.email)
      this.createRequestForm.get('eid')?.setValue(user?.eid)
      this.createRequestForm.get('tradeLicense')?.setValue(user?.tradeLicense)
    }
  }
  // inite Form
  initeForm() {
    this.createRequestForm = this.formBuilder.group({
      userId: ['', Validators.required],
      customerName: [null, Validators.required],
      senderAddress: [null, Validators.required],
      mobile: [null, Validators.required],
      eid: [null, Validators.required],
      tradeLicense: [null, Validators.required],
      campaignContent: [null, Validators.required],
      authorisedPerson: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
    })

    this.locationtForm = this.formBuilder.group({
      userId: ['', Validators.required],
      emirate: [null, Validators.required],
      area: [null, Validators.required],
    })

    this.locationtForm.get('emirate')?.valueChanges.subscribe((selectedEmirate) => {
      this.updateAreas(selectedEmirate);
    });
    this.locationtForm.get('area')?.valueChanges.subscribe((selectedArea) => {
    });
  }


  updateAreas(selectedEmirate: string) {
     this.filteredAreas = this.areas.filter((area) => area.emirate === selectedEmirate);
    this.createRequestForm.get('area')?.setValue('');
  }


  createRequest() {
    this.uiState.isSubmitting = true
    this.uiState.isLoading = true
    if (this.createRequestForm.invalid) {
      this.uiState.isLoading = false
      return
    }
    this.appService.createRequest(this.createRequestForm.value).subscribe(
      {
        next: (res) => {
          this.uiState.successMessage = res.responseMessage
          this.uiState.isLoading = false, this.uiState.isSuccess = true, setTimeout(() => {
            this.uiState.isSuccess = false
          }, 2000);
          this.getAdminDetail()
          this.router.navigate([AppRoutes.Request.User.details])
        },
        error: (error) => {
          this.uiState.isAlertVisible = true,
            this.uiState.isLoading = false,
            this.uiState.errorMessage = error.error.responseMessage
          setTimeout(() => {
            this.uiState.isAlertVisible = false
          }, 4000);
        }
      }
    )
  }
  onFileSelected(fieldName: string, event: Event) {
    if (event) {
      const inputElement = this.createRequestForm.get(fieldName);
      if (inputElement instanceof FormControl) {
        const files = (<HTMLInputElement>event.target).files;
        if (files && files.length > 0) {
          inputElement.setValue(files[0]);
        }
      }
    }
  }

  addUserLocation    () {
    this.appService.addUserLocation(this.locationtForm.value).subscribe( {
      next: (res) => {
        this.uiState.isFormVisual = true
      },
      error: (err) => {
      },
    })
  }


  getAdminDetail(){
    this.appService.getUser("admin").subscribe({
      next: (res) => {
        this.sentMessamge(res.phoneNumber)
      },
      error: () => { }
    })
  }

  sentMessamge(mobile: string) {
    let sendMessage: LaunchCampaign = {
      phoneNumber: mobile,
      senderAddress : this.createRequestForm.get('senderAddress')?.value,
      campaignContent: 'You have pending request please log in and check',
    }

    this.appService.launchCampaign(sendMessage).subscribe({
      next: (res) => {
      },
      error: () => { }
    })
  }

}
