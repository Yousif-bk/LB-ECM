import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { JwtInterceptors } from './shared/helper/interceptors/JwtInterceptors';
import { SuperAdminListComponent } from './components/Requests/super-admin-list/super-admin-list.component';
import { AdminListComponent } from './components/Requests/admin-list/admin-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SuperAdminListComponent,
    AdminListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptors, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
