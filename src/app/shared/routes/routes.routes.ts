import { RequestsModule } from './../../components/Requests/requests.module';
import { LandingComponent } from './../../components/home/landing/landing.component';
import { Routes } from '@angular/router';
import { AppRoutes } from '../model/AppRoutes';
import { PathNotFoundComponent } from '../components/path-not-found/path-not-found.component';
import { AuthGuard } from '../helper/guard/auth.guard';
import { UnauthGuard } from '../helper/guard/unauth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: AppRoutes.Home.main,
    pathMatch: 'full',
  },
  {
    path: AppRoutes.Auth.main,
    // canActivate: [UnauthGuard],
    loadChildren: () => import('../../components/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: AppRoutes.Home.main,
    canActivate:[AuthGuard],
    loadComponent: () => import('../../components/home/landing/landing.component').then(m => m.LandingComponent)
  },
  {
    path: AppRoutes.Request.main,
    canActivate: [AuthGuard],
    loadChildren: () => import('../../components/Requests/requests.module').then(m => m.RequestsModule)
  },
  { path: '**', component: PathNotFoundComponent },
]
