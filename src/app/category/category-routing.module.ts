import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { CategoryComponent } from './category.component';

const routes: Routes = [
  Route.withShell([
    { path: 'category', component: CategoryComponent, data: { title: extract('Category') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CategoryRoutingModule { }
