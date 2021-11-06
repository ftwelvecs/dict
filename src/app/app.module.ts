import {NgModule} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DepartmentComponent} from './department/department.component';
import {RegionComponent} from './region/region.component';
import {CursorPointerDirective} from './shared/cursor-pointer.directive';
import { UsersComponent } from './users/users.component';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    RegionComponent,
    CursorPointerDirective,
    UsersComponent
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
