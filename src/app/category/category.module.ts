import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { CategoryTableComponent } from './category-table/category-table.component';
import { CategoryRowComponent } from './category-table/category-row/category-row.component';

@NgModule({
  imports: [
    CommonModule,
    CategoryRoutingModule,
    TranslateModule
  ],
  declarations: [CategoryComponent, 
    CategoryEditorComponent, 
    CategoryTableComponent, 
    CategoryRowComponent],
  entryComponents: [CategoryRowComponent]
})
export class CategoryModule { }
