import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { RouterModule } from '@angular/router';
import { MessageAlertComponent } from './components/message-alert/message-alert.component';
import { LoaderComponent } from './components/loader/loader.component';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    PathNotFoundComponent,
    MessageAlertComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbDropdownModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    MessageAlertComponent,
    LoaderComponent,

  ]
})
export class SharedModule { }
