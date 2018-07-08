import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { CategoryCardComponent } from './category-list/category-card/category-card.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    TranslateModule
  ],
  declarations: [CategoryComponent, 
    CategoryEditorComponent, 
    CategoryListComponent, 
    CategoryCardComponent],
  entryComponents: [CategoryCardComponent]
})
export class CategoryModule { }
