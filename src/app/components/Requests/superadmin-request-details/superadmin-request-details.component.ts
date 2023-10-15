import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserRequestDetails } from 'src/app/shared/model/UserRequestDetails';
import { AppService } from 'src/app/shared/services/app.service';

@Component({
  selector: 'app-superadmin-request-details',
  templateUrl: './superadmin-request-details.component.html',
  styleUrls: ['./superadmin-request-details.component.scss']
})
export class SuperadminRequestDetailsComponent implements OnInit {
  userRequestDetails: UserRequestDetails

  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail() {
    const requestId = this.router.url.split('/superadmin-request-details/')[1];

    this.appService.getUserRequestDetail(requestId).subscribe((res) => {
      this.userRequestDetails = res;
    })
  }
}
