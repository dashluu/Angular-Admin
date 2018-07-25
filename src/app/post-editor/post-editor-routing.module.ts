import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { PostEditorComponent } from '@app/post-editor/post-editor.component';

const routes: Routes = [
  Route.withShell([
    { path: 'posts/new', component: PostEditorComponent, data: { title: extract('Post') } },
    { path: 'posts/:id', component: PostEditorComponent, data: { title: extract('Post') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class PostEditorRoutingModule { }
