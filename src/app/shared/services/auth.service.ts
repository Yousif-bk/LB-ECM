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
        localStorage.setItem(LocallyStoredItemsKeys.JWT, res.token);
        this.setIsLoggedIn(true);
        const userRole = res.roles[0];
        const email = res.email;
        const name = res.name;
        const userId = res.userId;
        const phoneNumber = res.phoneNumber;
        const eid = res.phoneNumber;
        const tradeLicense = res.tradeLicense;
        const hasRequests = res.hasRequests;
        const user: User = {
          email: email,
          name: name,
          eid: eid,
          tradeLicense: tradeLicense,
          userId: userId,
          phoneNumber: phoneNumber,
          hasRequests: hasRequests,
          role: userRole
        };
        const userJson = JSON.stringify(user);
        this.userSubject.next(user);
        localStorage.setItem(LocallyStoredItemsKeys.User, userJson);

        this.redirectBasedOnRole(userRole, hasRequests);
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
  private redirectBasedOnRole(userRole: string, hasRequest: boolean): void {
    if (userRole === 'user') {
      if (hasRequest) {
        this.router.navigate([AppRoutes.Request.User.details]);
      } else {
        this.router.navigate([AppRoutes.Request.User.main]);
      }
    } else if (userRole === 'admin') {
      this.router.navigate([AppRoutes.Request.Admin.main]);
    } else if (userRole === 'superadmin') {
      this.router.navigate([AppRoutes.Request.SuperAdmin.main]);
    } else {
      console.log('Unknown user role:', userRole);
    }
  }

}
