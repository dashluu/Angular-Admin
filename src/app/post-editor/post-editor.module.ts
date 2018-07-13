import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PostEditorComponent } from './post-editor.component';
import { PostEditorRoutingModule } from '@app/post-editor/post-editor-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PostEditorRoutingModule
  ],
  declarations: [PostEditorComponent]
})
export class PostEditorModule { }
