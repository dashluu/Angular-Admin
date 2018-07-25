import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Route, extract } from '@app/core';
import { CategoryComponent } from '@app/category/category.component';

const routes: Routes = [
  Route.withShell([
    { path: 'categories', component: CategoryComponent, data: { title: extract('Categories') } }
  ])
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class CategoryRoutingModule { }
