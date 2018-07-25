import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { UserComponent } from '@app/user/user.component';

const routes: Routes = [
  Route.withShell([
    { path: 'users', component: UserComponent, data: { title: extract('Users') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class UserRoutingModule { }
