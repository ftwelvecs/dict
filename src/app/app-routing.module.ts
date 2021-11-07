import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {RegionComponent} from "./region/region.component";
import {DepartmentComponent} from "./department/department.component";
import {UserComponent} from "./users/user/user.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: 'users', component: UsersComponent, children: [
      { path: ':id', component: UserComponent }
    ]
  },
  { path: 'region', component: RegionComponent },
  { path: 'department', component: DepartmentComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
