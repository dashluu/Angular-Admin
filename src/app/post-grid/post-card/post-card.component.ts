import { Component, OnInit, Input, HostBinding, AfterViewChecked } from '@angular/core';
import { PostCardModel } from '@app/post-grid/Models/post-card.model';
import { PostGridUIService } from '@app/post-grid/Services/post-grid-ui.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit, AfterViewChecked {
  postCardModel: PostCardModel;
  @HostBinding("class.col-lg-4") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-6") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;

  constructor(private postGridUIService: PostGridUIService) { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    
  }

  deletePost() {
    this.postGridUIService.deletePost(this.postCardModel.id);
  }
}
