import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  // UI Stat
  uiState = {
    isLoading: false,
    isSubmitting: false,
    isAlertVisible: false,
    errorMessage: ''
  }
  // Forms
  signInFormGroup: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.initeForm()
  }

  // inite Form
  initeForm() {
    this.signInFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/)]],
      password: [null, [Validators.required]]
    })
  }

  signIn() {
    this.uiState.isSubmitting = true
    this.uiState.isLoading = true
    if (this.signInFormGroup.invalid) {
      this.uiState.isLoading = false
      return
    }
    this.authService.signIn(this.signInFormGroup.value).subscribe(
      {
        next: (res) => { this.uiState.isLoading = false },
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
}
