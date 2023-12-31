import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiRoutes } from '../model/ApiRoutes';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminApproval } from '../model/AdminApproval';
import { SuperAdminApproval } from '../model/SuperAdminApproval';
import { ILocation } from '../model/ILocation';
import { LaunchCampaign } from '../model/LaunchCampaign';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isHeaderHidden = new BehaviorSubject<boolean>(true);
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient, private router: Router) { }

  setisHeaderHidden(isHeaderHidden: boolean): void {
    console.log(isHeaderHidden)
    this.isHeaderHidden.next(isHeaderHidden);
  }

  getisHeaderHidden(): BehaviorSubject<boolean> {
    return this.isHeaderHidden;
  }


  createRequest(createRequest: any): Observable<any> {
    return this.http.post(this.apiUrl + ApiRoutes.Request.createRequest, createRequest);
  }

  getAdminRequest(): Observable<any> {
    return this.http.get(this.apiUrl + ApiRoutes.Request.getAdminRequest);
  }
  getSuperAdminRequest(): Observable<any> {
    return this.http.get(this.apiUrl + ApiRoutes.Request.getSuperAdminRequest);
  }

  getUserRequestDetail(userId: any): Observable<any> {
    return this.http.get(this.apiUrl + ApiRoutes.Request.getUserRequestDetail  + userId);
  }

  adminApporvalRequest(adminApproval: AdminApproval): Observable<any> {
    return this.http.post(this.apiUrl + ApiRoutes.Request.adminApporvalRequest, adminApproval);
  }
  adminRejectRequest(adminApproval: AdminApproval): Observable<any> {
    return this.http.post(this.apiUrl + ApiRoutes.Request.adminApporvalRequest, adminApproval);
  }


  superAdminApporvalRequest(superAdminApproval: SuperAdminApproval): Observable<any> {
    return this.http.post(this.apiUrl + ApiRoutes.Request.superAdminApporvalRequest, superAdminApproval);
  }
  superAdminRejectRequest(superAdminApproval: SuperAdminApproval): Observable<any> {
    return this.http.post(this.apiUrl + ApiRoutes.Request.superAdminApporvalRequest, superAdminApproval);
  }

  addUserLocation(userLocation: ILocation): Observable<any> {
    return this.http.post(this.apiUrl + ApiRoutes.Location.userLocation, userLocation);
  }

  getBigdataDetails(id: any): Observable<any> {
    return this.http.get(this.apiUrl + ApiRoutes.BigData.getBigDataDetails + id);
  }

  launchCampaign(launchCampaign: LaunchCampaign): Observable<any> {
    return this.http.post(this.apiUrl + ApiRoutes.LaunchCampaign.sentMessage, launchCampaign);
  }
}
