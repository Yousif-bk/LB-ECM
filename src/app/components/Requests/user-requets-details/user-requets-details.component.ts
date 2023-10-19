import { AppService } from 'src/app/shared/services/app.service';
import { Component, OnInit } from '@angular/core';
import { LocallyStoredItemsKeys } from 'src/app/shared/model/LocallyStoredItemsKeys';
import { UserRequestDetails } from 'src/app/shared/model/UserRequestDetails';

@Component({
  selector: 'app-user-requets-list',
  templateUrl: './user-requets-details.component.html',
  styleUrls: ['./user-requets-details.component.scss']
})
export class UserRequetsDetailsComponent implements OnInit {

  userRequestDetails: UserRequestDetails
  isLoading: boolean = false

  constructor(private appService: AppService) { }
  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    const userJson = localStorage.getItem(LocallyStoredItemsKeys.User)
    if (userJson !== null) {
      const user = JSON.parse(userJson)
      this.getUserRequestDetail(user.userId)
    }
  }
  getUserRequestDetail(userId: string) {
    this.isLoading = true
    console.log(this.isLoading);

    this.appService.getUserRequestDetail(userId).subscribe({
      next: (res) => {
        this.userRequestDetails = res;
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
      }
    });
    }
}
