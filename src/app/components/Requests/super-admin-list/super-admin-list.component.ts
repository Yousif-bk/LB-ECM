import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
  isApproved: boolean = false;
  isRejected: boolean = false;


  constructor(private appService: AppService, private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.appService.getSuperAdminRequest().subscribe(res => {
      this.requestlist = res as IRequest[];
    })
  }

  approve(adminApprovalStatus: number, requestId: string, userId: string) {
    const superAdminApproval = {
      superAdminApprovalStatus: adminApprovalStatus,
      requestId: requestId
    };
    this.appService.superAdminApporvalRequest(superAdminApproval).subscribe(res => {
      this.isRejected = false;
      this.isApproved = true
      this.modalService.dismissAll();
      this.router.navigate(['/security-request-details/', userId])
    })
  }

  reject(securityApprovalStatus: number, requestId: string, userId: string) {
    const securityApproval = {
      superAdminApprovalStatus: securityApprovalStatus,
      requestId: requestId
    };
    console.log(securityApproval);

    this.appService.superAdminApporvalRequest(securityApproval).subscribe(res => {
      this.isRejected = true;
      this.isApproved = false
      this.modalService.dismissAll();
      this.router.navigate(['/security-request-details/', userId])
    })
  }
  adminRequestDetail(requestid: string) {
    this.router.navigate([AppRoutes.Request.SuperAdmin.details + requestid])
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }
}

