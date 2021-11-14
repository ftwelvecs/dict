import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {UsersComponent} from "./users/users.component";
import {RegionComponent} from "./region/region.component";
import {DepartmentsComponent} from "./departments/departments.component";
import {UserComponent} from "./users/user/user.component";
import {NotFoundComponent} from "./not-found/not-found.component";
import {PositionsComponent} from "./positions/positions.component";
import {DepartmentComponent} from "./departments/department/department.component";

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'users', component: UsersComponent },
  { path: 'users/:username', component: UserComponent},
  { path: 'region', component: RegionComponent },
  { path: 'departments', component: DepartmentsComponent },
  { path: 'departments/:name', component: DepartmentComponent },
  { path: 'positions', component: PositionsComponent},
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
