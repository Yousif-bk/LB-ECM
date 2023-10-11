import { Component } from '@angular/core';
import { IRequest } from 'src/app/shared/model/IRequest';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-super-admin-list',
  templateUrl: './super-admin-list.component.html',
  styleUrls: ['./super-admin-list.component.scss']
})
export class SuperAdminListComponent {
  requestlist: IRequest[] = [];
  constructor(private appService: AppService) { }
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
}
