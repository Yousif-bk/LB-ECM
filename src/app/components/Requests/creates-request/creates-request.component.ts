import { AuthService } from 'src/app/shared/services/auth.service';
import { AppService } from './../../../shared/services/app.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LocallyStoredItemsKeys } from 'src/app/shared/model/LocallyStoredItemsKeys';

@Component({
  selector: 'app-creates-request',
  templateUrl: './creates-request.component.html',
  styleUrls: ['./creates-request.component.scss']
})
export class CreatesRequestComponent {
  constructor(private appService: AppService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }

  emirates = [
    { value: 'emirates1', label: 'DXB' },
    { value: 'emirates2', label: 'AUH' },
    { value: 'emirates3', label: 'SHJ' }
  ]
  areas = [
    { value: 'area1', label: 'Area 1', emirate: 'emirates1' },
    { value: 'area2', label: 'Area 2', emirate: 'emirates1' },
    { value: 'area3', label: 'Area 3', emirate: 'emirates2' },
    { value: 'area4', label: 'Area 4', emirate: 'emirates2' },
    { value: 'area5', label: 'Area 5', emirate: 'emirates3' }
  ];
  selectedEmirate: string;
  filteredAreas: any[];

  onEmirateChange() {
    this.filteredAreas = this.areas.filter(area => area.emirate === this.selectedEmirate);
  }

  uiState = {
    isLoading: false,
    isSubmitting: false,
    isAlertVisible: false,
    errorMessage: '',
    isSuccess: false,
    isFormVisual: false,
    isDisabled: true
  }

  // Forms
  createRequestForm: FormGroup
  locationtForm: FormGroup

  ngOnInit(): void {
    this.initeForm(),
    this.getUserId();
    console.log(this.uiState.isDisabled);

  }


  getUserId() {
    const userJson = localStorage.getItem(LocallyStoredItemsKeys.User)
    if (userJson !== null) {
      const user = JSON.parse(userJson);
      this.createRequestForm.get('userId')?.setValue(user?.userId)
      this.createRequestForm.get('mobile')?.setValue(user?.phoneNumber)
      this.createRequestForm.get('customerName')?.setValue(user?.fullName)
      this.createRequestForm.get('email')?.setValue(user?.email)
    }
  }
  // inite Form
  initeForm() {
    this.createRequestForm = this.formBuilder.group({
      userId: ['', Validators.required],
      customerName: [null, Validators.required],
      mobile: [null, Validators.required],
      eid: [null, Validators.required],
      tradeLicense: [null, Validators.required],
      campaignContent: [null, Validators.required],
      authorisedPerson: [null, Validators.required],
      email: [null, [Validators.required, Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
    })

    this.locationtForm = this.formBuilder.group({
      emirates: [null, Validators.required],
      area: [null, Validators.required],
    })
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
          this.uiState.isLoading = false, this.uiState.isSuccess = true, setTimeout(() => {
            this.uiState.isSuccess = false
          }, 2000);
        },
        error: (error) => {
          this.uiState.isAlertVisible = true,
            this.uiState.isLoading = false,
            this.uiState.errorMessage = error.error.responseMessage
          setTimeout(() => {
            this.uiState.isAlertVisible = false
          }, 2000);
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

  locationRequest(){
    this.uiState.isFormVisual = true
  }


}
