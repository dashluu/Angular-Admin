import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '@app/comment/comment.component';
import { CommentCardComponent } from '@app/comment/comment-card/comment-card.component';
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
