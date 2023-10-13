import { User } from './../../model/User ';
import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { AppRoutes } from '../../model/AppRoutes';
import { AuthService } from '../../services/auth.service';
import { LocallyStoredItemsKeys } from '../../model/LocallyStoredItemsKeys';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  email: string | null
  fullName: string

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  uiState = {
    isNavbarCollapsed: false,
    isOnMidScreen: false,
    activeItem: "home"
  }


  ngOnInit(): void {
    this.getScreenSize()
    this.userInfo();
  }

  userInfo() {
    const userJson = localStorage.getItem(LocallyStoredItemsKeys.User)
    if (userJson !== null) {
      const user = JSON.parse(userJson);
      this.email = user.email
      this.fullName = user.fullName
    }
  }
  // Listen for window size changes
  @HostListener("window:resize", ["$event"])
  getScreenSize(event?: any): void {
    // If browser window is resized below mid screen size width
    window.innerWidth <= 858
      ? (this.uiState.isOnMidScreen = true)
      : (this.uiState.isOnMidScreen = false);
  }

  onSelected(selectedItem: string) {
    this.uiState.activeItem = selectedItem
  }

  logout() { this.authService.logout() }
}
