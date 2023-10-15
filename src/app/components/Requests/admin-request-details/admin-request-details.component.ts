import { AppService } from 'src/app/shared/services/app.service';
import { Component, OnInit } from '@angular/core';
import { UserRequestDetails } from 'src/app/shared/model/UserRequestDetails';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-admin-request-details',
  templateUrl: './admin-request-details.component.html',
  styleUrls: ['./admin-request-details.component.scss']
})
export class AdminRequestDetailsComponent implements OnInit {

  userRequestDetails: UserRequestDetails

  constructor(private appService: AppService, private router: Router){}

  ngOnInit(): void {
    this.getUserDetail();
  }

  getUserDetail(){
    const requestId = this.router.url.split('/admin-request-details/')[1];

    this.appService.getUserRequestDetail(requestId).subscribe((res) =>{
      this.userRequestDetails = res;
    })
  }
}
