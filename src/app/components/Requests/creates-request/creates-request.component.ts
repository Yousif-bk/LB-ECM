import { AuthService } from 'src/app/shared/services/auth.service';
import { AppService } from './../../../shared/services/app.service';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-creates-request',
  templateUrl: './creates-request.component.html',
  styleUrls: ['./creates-request.component.scss']
})
export class CreatesRequestComponent {
  constructor(private appService: AppService,
    private authService: AuthService,
    private formBuilder: FormBuilder) { }
  uiState = {
    isLoading: false,
    isSubmitting: false,
    isAlertVisible: false,
    errorMessage: '',
    isSuccess: false,
  }
  // Forms
  createRequestForm: FormGroup

  ngOnInit(): void {
    this.initeForm(),
    this.userSubject();
  }


  userSubject(){
    this.authService.userSubject.subscribe(user => {
      this.createRequestForm.get('userId')?.setValue(user?.userId)
    });
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


}
