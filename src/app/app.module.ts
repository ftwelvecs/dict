import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DepartmentComponent } from './department/department.component';
import { RegionComponent } from './region/region.component';
import {FormsModule} from "@angular/forms";
import { CursorPointerDirective } from './shared/cursor-pointer.directive';

@NgModule({
  declarations: [
    AppComponent,
    DepartmentComponent,
    RegionComponent,
    CursorPointerDirective
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
