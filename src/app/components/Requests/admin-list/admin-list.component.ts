import { IRequest } from 'src/app/shared/model/IRequest';
import { AppService } from './../../../shared/services/app.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.scss']
})
export class AdminListComponent implements OnInit {


  requestlist: IRequest[] = [];
  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.appService.getAdminRequest().subscribe(res => {
      this.requestlist = res as IRequest[];
    })
  }

  approve(adminApprovalStatus: number, requestId: string) {
    const adminApproval = {
      adminApprovalStatus: adminApprovalStatus,
      requestId: requestId
    };
    this.appService.adminApporvalRequest(adminApproval).subscribe(res => {
      console.log(res);

    })
  }

  reject(adminApprovalStatus: number, requestId: string) {
    const adminApproval = {
      adminApprovalStatus: adminApprovalStatus,
      requestId: requestId
    };
    this.appService.adminApporvalRequest(adminApproval).subscribe(res => {
    })
  }
}
