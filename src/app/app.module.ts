import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DepartmentsComponent} from './components/departments/departments.component';
import {RegionComponent} from './components/region/region.component';
import {CursorPointerDirective} from './shared/cursor-pointer.directive';
import { UsersComponent } from './components/users/users.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/users/user/user.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PositionsComponent } from './components/positions/positions.component';
import { DepartmentComponent } from './components/departments/department/department.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ModalComponent } from './shared/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import { LoginComponent } from './pages/login/login.component';
import { MainLayoutComponent } from './common/main-layout/main-layout.component';
import { LoginLayoutComponent } from './common/login-layout/login-layout.component';
import {FlexLayoutModule} from "@angular/flex-layout";

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
    MenuComponent,
    ModalComponent,
    LoginComponent,
    MainLayoutComponent,
    LoginLayoutComponent
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
