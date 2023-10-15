import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/model/AppRoutes';
import { IRequest } from 'src/app/shared/model/IRequest';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-super-admin-list',
  templateUrl: './super-admin-list.component.html',
  styleUrls: ['./super-admin-list.component.scss']
})
export class SuperAdminListComponent {
  requestlist: IRequest[] = [];
  constructor(private appService: AppService, private router: Router) { }
  ngOnInit(): void {
    this.appService.getAdminRequest().subscribe(res => {
      this.requestlist = res as IRequest[];
    })
  }

  approve(adminApprovalStatus: number, requestId: string) {
    const superAdminApproval = {
      superAdminApprovalStatus: adminApprovalStatus,
      requestId: requestId
    };
    this.appService.superAdminApporvalRequest(superAdminApproval).subscribe(res => {
      console.log(res);
    })
  }

  reject(adminApprovalStatus: number, requestId: string) {
    const superAdminApproval = {
      superAdminApprovalStatus: adminApprovalStatus,
      requestId: requestId
    };
    this.appService.superAdminApporvalRequest(superAdminApproval).subscribe(res => {
    })
  }
  adminRequestDetail(requestid: string) {
    this.router.navigate([AppRoutes.Request.SuperAdmin.details + requestid])
  }
}
