import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { AppRoutes } from '../../model/AppRoutes';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private router: Router
  ){}

  uiState = {
    isNavbarCollapsed: false,
    isOnMidScreen: false,
    activeItem: "home"
  }


  ngOnInit(): void {
    this.getScreenSize()
  }


  // Listen for window size changes
  @HostListener("window:resize", ["$event"])
  getScreenSize(event?: any): void {
    // If browser window is resized below mid screen size width
    window.innerWidth <= 858
      ? (this.uiState.isOnMidScreen = true)
      : (this.uiState.isOnMidScreen = false);
  }

  onSelected(selectedItem:string){
    this.uiState.activeItem = selectedItem
  }

  logout(){
    localStorage.clear();
    this.router.navigate([AppRoutes.Auth.signIn.full])
  }
}
