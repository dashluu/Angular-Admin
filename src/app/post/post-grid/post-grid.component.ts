import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PostCardComponent } from '@app/post/post-grid/post-card/post-card.component';
import { PostCardModel } from '@app/post/Models/post-card.model';

@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss']
})
export class PostGridComponent implements OnInit {
  @ViewChild('postGridVar', { read: ViewContainerRef }) container: any;
  componentRef: ComponentRef<PostCardComponent>;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  ngOnInit() {
  }

  // ngOnDestroy() {
  //   if (this.componentRef !== null) {
  //     this.componentRef.destroy();
  //   }
  // }

  createPostCard(postCardModel: PostCardModel) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(PostCardComponent);
    this.componentRef = this.container.createComponent(componentFactory);
    this.componentRef.instance.postCardModel = postCardModel;
  }

  testCreatePostCard() {
    let postCardModel: PostCardModel = {
      title: "Whatever",
      createdDate: "aaa",
      updatedDate: "aaa",
      summary: "This is a summary.",
      thumbnailImageSrc: "https://images.pexels.com/photos/58997/pexels-photo-58997.jpeg?auto=compress&cs=tinysrgb&h=350"
    };

    this.createPostCard(postCardModel);
  }

}
