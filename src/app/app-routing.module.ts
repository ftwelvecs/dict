import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./components/home/home.component";
import {UsersComponent} from "./components/users/users.component";
import {RegionComponent} from "./components/region/region.component";
import {DepartmentsComponent} from "./components/departments/departments.component";
import {UserComponent} from "./components/users/user/user.component";
import {NotFoundComponent} from "./pages/not-found/not-found.component";
import {PositionsComponent} from "./components/positions/positions.component";
import {DepartmentComponent} from "./components/departments/department/department.component";
import {LoginComponent} from "./pages/login/login.component";
import {MainLayoutComponent} from "./common/main-layout/main-layout.component";
import {LoginLayoutComponent} from "./common/login-layout/login-layout.component";
import {AuthGuard} from "./common/guards/auth.guard";
import {MaterialValuesComponent} from "./components/material-values/material-values.component";

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard],
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'users', component: UsersComponent},
      {path: 'users/:username', component: UserComponent},
      {path: 'region', component: RegionComponent},
      {path: 'departments', component: DepartmentsComponent},
      {path: 'departments/:name', component: DepartmentComponent},
      {path: 'positions', component: PositionsComponent},
      {path: 'material_values', component: MaterialValuesComponent}
    ]
  },
  {
    path: '', component: LoginLayoutComponent, children: [
      {path: 'login', component: LoginComponent}
    ]
  },
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
