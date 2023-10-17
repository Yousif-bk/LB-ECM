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
  constructor(private appService: AppService, private router: Router, private modalService: NgbModal) { }
  ngOnInit(): void {
    this.appService.getAdminRequest().subscribe(res => {

      console.log(res);

      this.requestlist = res as IRequest[];
    })
  }

  approve(adminApprovalStatus: number, requestId: string) {
    const adminApproval = {
      adminApprovalStatus: adminApprovalStatus,
      requestId: requestId
    };
    this.appService.adminApporvalRequest(adminApproval).subscribe(res => {
      this.isApproved = true;
      this.modalService.dismissAll();
    })
  }

  reject(adminApprovalStatus: number, requestId: string) {
    const adminApproval = {
      adminApprovalStatus: adminApprovalStatus,
      requestId: requestId
    };
    this.appService.adminApporvalRequest(adminApproval).subscribe(res => {
      this.isRejected = true;

    })
  }

  adminRequestDetail(requestid: string) {
    this.router.navigate([AppRoutes.Request.Admin.details + requestid]);
  }

  openVerticallyCentered(content:any) {
    this.modalService.open(content, { centered: true });
  }
}
