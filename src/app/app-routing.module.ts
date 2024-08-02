import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { UserListPage2Component } from './user-list-page2/user-list-page2.component';
const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'user/:id', component: UserDetailsComponent },
  { path: 'page2', component: UserListPage2Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
