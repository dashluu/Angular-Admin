import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGridComponent } from './post-grid/post-grid.component';
import { PostCardComponent } from './post-grid/post-card/post-card.component';
import { PostRoutingModule } from '@app/post/post-routing.module';
import { PostComponent } from '@app/post/post.component';

@NgModule({
  imports: [
    CommonModule,
    PostRoutingModule
  ],
  declarations: [PostComponent, PostGridComponent, PostCardComponent],
  entryComponents: [PostCardComponent]
})
export class PostModule { }
