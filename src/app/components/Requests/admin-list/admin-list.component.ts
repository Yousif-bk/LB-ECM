import { IRequest } from 'src/app/shared/model/IRequest';
import { AppService } from './../../../shared/services/app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutes } from 'src/app/shared/model/AppRoutes';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {

  isApproved: boolean = false;
  isRejected: boolean = false;
  requestlist: IRequest[] = [];
  adminApprovalStatus: number

  constructor(private appService: AppService, private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.appService.getAdminRequest().subscribe(res => {
      this.requestlist = res as IRequest[];
      this.checkRequestApproved(res[0].userId)
    })
  }
  checkRequestApproved(userId: string) {
    this.appService.getUserRequestDetail(userId).subscribe({
      next: (res) => {
        console.log(res.approval.adminApprovalStatus);

        this.adminApprovalStatus = res.approval.adminApprovalStatus
      },
      error: () => { }
    })
  }
  approve(adminApprovalStatus: number, items:any) {
    const adminApproval = {
      adminApprovalStatus: adminApprovalStatus,
      requestId: items.requestId
    };
    this.appService.adminApporvalRequest(adminApproval).subscribe(res => {
      this.modalService.dismissAll();
      this.router.navigate(['/admin-request-details/', items.userId])
      this.isApproved = true;
      this.sentMessamge(items.mobile, items.customerName, true);
    })
  }

  reject(adminApprovalStatus: number, items:any) {
    const adminApproval = {
      adminApprovalStatus: adminApprovalStatus,
      requestId: items.requestId
    };
    this.appService.adminApporvalRequest(adminApproval).subscribe(res => {
      this.modalService.dismissAll();
      this.router.navigate(['/admin-request-details/', items.userId])
      this.isRejected = true;
      this.sentMessamge(items.mobile, items.customerName, false);
    })
  }

  adminRequestDetail(requestid: string) {
    this.router.navigate([AppRoutes.Request.Admin.details + requestid]);
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }

  sentMessamge(mobile: string, customerName: string, isApproved: boolean) {

    let sendMessage = { phoneNumber: mobile, campaignContent: '' };
    if (isApproved) {
      sendMessage.campaignContent = `${customerName} your request has been approved`;
    } else {
      sendMessage.campaignContent = `${customerName} your request has been rejected`;
    }

    this.appService.launchCampaign(sendMessage).subscribe({
      next:(res) =>{
        console.log(res);
      },
      error:() => {}
    })
  }
}
