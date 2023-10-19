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
import { AdminRequestDetailsComponent } from './admin-request-details/admin-request-details.component';
import { SuperadminRequestDetailsComponent } from './superadmin-request-details/superadmin-request-details.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    SuperAdminListComponent,
    AdminListComponent,
    CreatesRequestComponent,
    UserRequetsDetailsComponent,
    ApprovalStatusPipe,
    AdminRequestDetailsComponent,
    SuperadminRequestDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    NgbTooltipModule,
    RouterModule.forChild(requestsRoutes)
  ]
})
export class RequestsModule { }
