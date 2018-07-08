import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { PostGridComponent } from './post-grid.component';

const routes: Routes = [
  Route.withShell([
    { path: 'posts', component: PostGridComponent, data: { title: extract('Posts') } },
    { path: 'posts/categories/:name', component: PostGridComponent, data: { title: extract('Posts') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PostGridRoutingModule { }
