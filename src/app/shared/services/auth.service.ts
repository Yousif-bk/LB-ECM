import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocallyStoredItemsKeys } from '../model/LocallyStoredItemsKeys';
import { SignInReq, SignUpReq } from '../model/AuthReq';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppRoutes } from '../model/AppRoutes';
import { ApiRoutes } from '../model/ApiRoutes';
import { User } from '../model/User ';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
  userSubject = new BehaviorSubject<User | null>(null);
  constructor(private http: HttpClient, private router: Router) { }


  signUp(signUpReq: SignUpReq): Observable<SignUpReq> {
    return this.http.post(this.apiUrl + ApiRoutes.Auth.signUp, signUpReq).pipe(
      tap((res: any) => {
        this.router.navigate([AppRoutes.Auth.signIn.full]);
      })
    );
  }

  signIn(signInReq: SignInReq): Observable<SignInReq> {
    return this.http.post(this.apiUrl + ApiRoutes.Auth.signIn, signInReq).pipe(
      tap((res: any) => {
        // Save access token on local storage
        localStorage.setItem(LocallyStoredItemsKeys.JWT, res.token);
        // Set authenticated user flag
        this.setIsLoggedIn(true);
        const userRole = res.roles[0];
        const email = res.email;
        const name = res.name;
        const userId = res.userId;
        const phoneNumber = res.phoneNumber;
        const eid = res.phoneNumber;
        const tradeLicense = res.phoneNumber;
        // Create a User object
        const user: User = {
          email: email,
          name: name,
          eid: eid,
          tradeLicense: tradeLicense,
          userId: userId,
          phoneNumber: phoneNumber,
          role: userRole
        };
        // Send the user data to the BehaviorSubject in AuthService
        const userJson = JSON.stringify(user);
        this.userSubject.next(user);
        localStorage.setItem(LocallyStoredItemsKeys.User, userJson);
        this.redirectBasedOnRole(userRole);
      })
    );
  }

  /**
  * Remove JWT Token
  */
  async logout(): Promise<any> {
    await localStorage.clear();
    this.setIsLoggedIn(false);
    await this.router.navigate([AppRoutes.Auth.signIn.full]);
  }

  private isTokenAvailable(): boolean {
    return !!localStorage.getItem(LocallyStoredItemsKeys.JWT);
  }

  setIsLoggedIn(isLoggedIn: boolean): void {
    this.isLoggedIn.next(isLoggedIn);
  }

  getIsLoggedIn(): BehaviorSubject<boolean> {
    return this.isLoggedIn;
  }
  private redirectBasedOnRole(userRole: string): void {
    if (userRole === 'user') {
      this.router.navigate([AppRoutes.Request.User.details]);
    } else if (userRole === 'admin') {
      this.router.navigate([AppRoutes.Request.Admin.main]);
    } else if (userRole === 'superadmin') {
      this.router.navigate([AppRoutes.Request.SuperAdmin.main]);
    }
    else {
      console.log('Unknown user role:', userRole);
    }
  }
}
