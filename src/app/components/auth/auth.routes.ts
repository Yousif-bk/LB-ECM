import { Routes } from "@angular/router";
import { AppRoutes } from "src/app/shared/model/AppRoutes";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      { path: AppRoutes.Auth.signIn.main, component: SignInComponent },
      { path: AppRoutes.Auth.signUp.main, component: SignUpComponent }
    ]
  },
];
