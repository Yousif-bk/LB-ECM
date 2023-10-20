import { AppService } from 'src/app/shared/services/app.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/shared/shared.module';
import { IBigData } from 'src/app/shared/model/IBigData';
import { LocallyStoredItemsKeys } from 'src/app/shared/model/LocallyStoredItemsKeys';

@Component({
  selector: 'app-big-data',
  templateUrl: './big-data.component.html',
  styleUrls: ['./big-data.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    NgbCarouselModule],
})
export class BigDataComponent implements OnInit {

  bigData: IBigData[] = [];
  isLoading: boolean = false
  customerName: string
  constructor(private appService: AppService, private router: Router) { }


  ngOnInit(): void {
    const userJson = localStorage.getItem(LocallyStoredItemsKeys.User)
    if (userJson !== null) {
      const user = JSON.parse(userJson);
      this.customerName = user.name
    }
    this.getBigDataDetails();
  }

  getBigDataDetails() {
    const id = this.router.url.split('/user-big-data/')[1];
    this.isLoading = true
    this.appService.getBigdataDetails(id).subscribe({
      next: (data) => {
        this.bigData = data
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
      }
    })
  }
  maskPhoneNumber(phoneNumber: string): string {
    if (phoneNumber && phoneNumber.length >= 2) {
      const lastFourDigits = phoneNumber.slice(-2);
      const maskedDigits = '*'.repeat(phoneNumber.length - 2);
      return maskedDigits + lastFourDigits;
    } else {
      return phoneNumber;
    }
  }

}
