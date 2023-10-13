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
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      username: [null, [Validators.required]],
      phoneNumber: [null, [Validators.required]],
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
    const firstName = this.signUpFormGroup.get('firstName')?.value;
    const lastName = this.signUpFormGroup.get('lastName')?.value;
    if (firstName && lastName) {
      const username = `${firstName}${lastName.charAt(0)}`;
      this.signUpFormGroup.get('username')?.setValue(username);
    }
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

