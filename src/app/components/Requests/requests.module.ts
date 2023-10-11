import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { requestsRoutes } from './requests.routes';
import { SuperAdminListComponent } from './super-admin-list/super-admin-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CreatesRequestComponent } from './creates-request/creates-request.component';



@NgModule({
  declarations: [
    SuperAdminListComponent,
    AdminListComponent,
    CreatesRequestComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(requestsRoutes)
  ]
})
export class RequestsModule { }
