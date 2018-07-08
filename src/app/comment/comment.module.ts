import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from './comment.component';
import { CommentCardComponent } from './comment-card/comment-card.component';
import { CommentRoutingModule } from '@app/comment/comment-routing.module';

@NgModule({
  imports: [
    CommonModule,
    CommentRoutingModule
  ],
  declarations: [CommentComponent, CommentCardComponent],
  entryComponents: [CommentCardComponent]
})
export class CommentModule { }
