import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostGridRoutingModule } from '@app/post-grid/post-grid-routing.module';
import { PostCardComponent } from '@app/post-grid/post-card/post-card.component';
import { PostGridComponent } from '@app/post-grid/post-grid.component';

@NgModule({
  imports: [
    CommonModule,
    PostGridRoutingModule
  ],
  declarations: [PostGridComponent, PostCardComponent],
  entryComponents: [PostCardComponent]
})
export class PostGridModule { }
