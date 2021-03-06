import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DepartmentsComponent} from './components/departments/departments.component';
import {RegionComponent} from './components/region/region.component';
import {CursorPointerDirective} from './shared/cursor-pointer.directive';
import {UsersComponent} from './components/users/users.component';
import {HomeComponent} from './components/home/home.component';
import {UserComponent} from './components/users/user/user.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {PositionsComponent} from './components/positions/positions.component';
import {DepartmentComponent} from './components/departments/department/department.component';
import {FormModalComponent} from './shared/form-modal/form-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {LoginComponent} from './pages/login/login.component';
import {MainLayoutComponent} from './common/main-layout/main-layout.component';
import {LoginLayoutComponent} from './common/login-layout/login-layout.component';
import {FlexLayoutModule} from "@angular/flex-layout";
import {ErrorHandler} from "./common/handler/error.handler";
import {MatTabsModule} from "@angular/material/tabs";
import {MatTableModule} from "@angular/material/table";
import {MatMenuModule} from "@angular/material/menu";
import {HeaderComponent} from './shared/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { MaterialValuesComponent } from './components/material-values/material-values.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentsComponent,
    RegionComponent,
    CursorPointerDirective,
    UsersComponent,
    HomeComponent,
    UserComponent,
    NotFoundComponent,
    PositionsComponent,
    DepartmentComponent,
    FormModalComponent,
    LoginComponent,
    MainLayoutComponent,
    LoginLayoutComponent,
    HeaderComponent,
    MaterialValuesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatTableModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandler, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
