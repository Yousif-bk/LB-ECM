import { Routes } from "@angular/router";
import { AppRoutes } from "src/app/shared/model/AppRoutes";
import { AdminListComponent } from "./admin-list/admin-list.component";
import { SuperAdminListComponent } from "./super-admin-list/super-admin-list.component";
import { CreatesRequestComponent } from "./creates-request/creates-request.component";
import { UserRequetsDetailsComponent } from "./user-requets-details/user-requets-details.component";

export const requestsRoutes: Routes = [
  {
    path: '',
    children: [
      { path: AppRoutes.Request.User.main, component: CreatesRequestComponent },
      { path: AppRoutes.Request.Admin.main, component: AdminListComponent },
      { path: AppRoutes.Request.SuperAdmin.main, component: SuperAdminListComponent },
      { path: AppRoutes.Request.User.details, component: UserRequetsDetailsComponent },
    ]
  },
];
