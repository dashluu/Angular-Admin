import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

import { FormsModule } from '@angular/forms';
import { CategoryRoutingModule } from '@app/category/category-routing.module';
import { CategoryComponent } from '@app/category/category.component';
import { CategoryEditorComponent } from '@app/category/category-editor/category-editor.component';
import { CategoryListComponent } from '@app/category/category-list/category-list.component';
import { CategoryCardComponent } from '@app/category/category-list/category-card/category-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
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
