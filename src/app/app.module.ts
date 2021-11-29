import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DepartmentsComponent} from './departments/departments.component';
import {RegionComponent} from './region/region.component';
import {CursorPointerDirective} from './shared/cursor-pointer.directive';
import { UsersComponent } from './users/users.component';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './users/user/user.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PositionsComponent } from './positions/positions.component';
import { DepartmentComponent } from './departments/department/department.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ModalComponent } from './shared/modal/modal.component';

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
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
