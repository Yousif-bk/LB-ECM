import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutes } from 'src/app/shared/model/AppRoutes';
import { BulkSMS } from 'src/app/shared/model/BulkSMS';
import { IRequest } from 'src/app/shared/model/IRequest';
import { LocallyStoredItemsKeys } from 'src/app/shared/model/LocallyStoredItemsKeys';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-super-admin-list',
  templateUrl: './super-admin-list.component.html',
  styleUrls: ['./super-admin-list.component.scss']
})
export class SuperAdminListComponent {

  adminPhoneNumber: string
  requestlist: IRequest[] = [];
  isApproved: boolean = false;
  isRejected: boolean = false;
  securityApprovalStatus:number


  constructor(private appService: AppService, private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.appService.getSuperAdminRequest().subscribe(res => {
      this.requestlist = res as IRequest[];
      this.checkRequestApproved(res[0].userId)
    })
  }

  checkRequestApproved(userId: string) {
    this.appService.getUserRequestDetail(userId).subscribe({
      next: (res) => {
        this.securityApprovalStatus = res.approval.superAdminApprovalStatus
      },
      error: () => {}
    })
  }

  approve(adminApprovalStatus: number, items: any) {
    const superAdminApproval = {
      superAdminApprovalStatus: adminApprovalStatus,
      requestId: items.requestId
    };
    this.appService.superAdminApporvalRequest(superAdminApproval).subscribe(res => {
      this.modalService.dismissAll();
      this.router.navigate(['/security-request-details/', items.userId])
      this.sentMessamge(items.mobile, items.customerName, true);
    })
  }

  reject(securityApprovalStatus: number, items: any) {

    const securityApproval = {
      superAdminApprovalStatus: securityApprovalStatus,
      requestId: items.requestId
    };


    this.appService.superAdminApporvalRequest(securityApproval).subscribe(res => {
      this.modalService.dismissAll();
      this.router.navigate(['/security-request-details/', items.userId])
      this.sentMessamge(items.mobile, items.customerName, false);
    })
  }
  adminRequestDetail(requestid: string) {
    this.router.navigate([AppRoutes.Request.SuperAdmin.details + requestid])
  }
  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true });
  }


  sentMessamge(mobile: string, customerName: string, isApproved: boolean) {

    const userJson = localStorage.getItem(LocallyStoredItemsKeys.User)
    if (userJson !== null) {
      const user = JSON.parse(userJson);
      this.adminPhoneNumber = user.phoneNumber;
    }

    let sendMessage: BulkSMS = {
      recipients: [this.adminPhoneNumber, mobile],
      campaignContent: '',
    }
    if (isApproved) {
      sendMessage.campaignContent = `${customerName} your request has been approved`;
    } else {
      sendMessage.campaignContent = `${customerName} your request has been rejected`;
    }

    this.appService.sendBulkSMS(sendMessage).subscribe({
      next: (res) => {
      },
      error: () => { }
    })
  }
}

