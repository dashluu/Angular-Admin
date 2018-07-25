import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { CommentComponent } from '@app/comment/comment.component';

const routes: Routes = [
  Route.withShell([
    { path: 'comments', component: CommentComponent, data: { title: extract('Comments') } },
    { path: 'posts/:id/comments', component: CommentComponent, data: { title: extract('Comments') } },
    { path: 'users/:name/comments', component: CommentComponent, data: { title: extract('Comments') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CommentRoutingModule { }
