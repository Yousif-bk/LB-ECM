import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LocallyStoredItemsKeys } from '../model/LocallyStoredItemsKeys';
import { SignInReq, SignUpReq } from '../model/AuthReq';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { AppRoutes } from '../model/AppRoutes';
import { ApiRoutes } from '../model/ApiRoutes';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  isLoggedIn = new BehaviorSubject<boolean>(this.isTokenAvailable());
  constructor(private http: HttpClient, private router: Router) { }


  signUp(signUpReq: SignUpReq): Observable<SignUpReq> {
    return this.http.post(this.apiUrl + ApiRoutes.Auth.signUp, signUpReq).pipe(
      tap((res: any) => {
        // Save access token on local storage
        localStorage.setItem(LocallyStoredItemsKeys.JWT, res.access_token);
        // Set authenticated user flag
        this.setIsLoggedIn(true);
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
        this.router.navigate([AppRoutes.Home.main])
      })
    );
  }

  /**
  * Remove JWT Token
  */
  async logout(): Promise<any> {
    await localStorage.clear();
    this.setIsLoggedIn(false);
    await this.router.navigate([AppRoutes.Auth.signIn.main]);
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
}
