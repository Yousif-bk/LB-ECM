import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { requestsRoutes } from './requests.routes';
import { SuperAdminListComponent } from './super-admin-list/super-admin-list.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { CreatesRequestComponent } from './creates-request/creates-request.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserRequetsDetailsComponent} from './user-requets-details/user-requets-details.component';
import { ApprovalStatusPipe } from 'src/app/shared/helper/approval-status.pipe';



@NgModule({
  declarations: [
    SuperAdminListComponent,
    AdminListComponent,
    CreatesRequestComponent,
    UserRequetsDetailsComponent,
    ApprovalStatusPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(requestsRoutes)
  ]
})
export class RequestsModule { }
