import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DepartmentComponent} from './department/department.component';
import {RegionComponent} from './region/region.component';
import {FormsModule} from "@angular/forms";
import {CursorPointerDirective} from './shared/cursor-pointer.directive';
import {AddressComponent} from './address/address.component';
import {RegionService} from "./services/region.service";

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    RegionComponent,
    CursorPointerDirective,
    AddressComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    RegionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
