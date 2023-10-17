import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Validation from 'src/app/shared/helper/password-validator';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  // UI State
  uiState = {
    isLoading: false,
    isSubmitting: false,
    isAlertVisiable: false,
    message: ''
  }
  // Form
  signUpFormGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }


  ngOnInit(): void {
    this.initForm()
  }


  initForm() {
    this.signUpFormGroup = this.fb.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
      eid: [null, [Validators.required]],
      tradeLicense: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(/\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/),]],
      password: [null, [Validators.required,
      Validators.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}$")]],
      role: ["user", [Validators.required]],
      // confirmPassword: [null, [Validators.required]]
    },
    // { validators: [Validation.match('password', 'confirmPassword')]}
    );
  }


  signUp() {
    this.uiState.isLoading = true
    this.uiState.isSubmitting = true
    const name = this.signUpFormGroup.get('name')?.value;
    this.signUpFormGroup.get('username')?.setValue(name);

    if (this.signUpFormGroup.invalid) {
      this.uiState.isLoading = false
      return
    }

    this.authService.signUp(this.signUpFormGroup.value).subscribe({
      next: (res) => {
        this.uiState.isLoading = false
      },
      error: (errors) => {
        this.uiState.isLoading = false
        this.uiState.isAlertVisiable = true,
          this.uiState.message = errors.UserName
      }
    })
  }

}

