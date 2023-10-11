import { Router } from '@angular/router';
import { Component, HostListener, OnInit } from '@angular/core';
import { AppRoutes } from '../../model/AppRoutes';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {


  email: string | null
  username: string

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  uiState = {
    isNavbarCollapsed: false,
    isOnMidScreen: false,
    activeItem: "home"
  }


  ngOnInit(): void {
    this.getScreenSize()
    this.userSubject();
  }

  userSubject() {
    this.authService.userSubject.subscribe(user => {
      this.email = user!.email ?? null;
      this.username = user!.username ?? "";
    });
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
