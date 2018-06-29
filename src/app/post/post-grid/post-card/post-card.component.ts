import { Component, OnInit, Input, HostBinding, AfterViewChecked } from '@angular/core';
import { PostCardModel } from '@app/post/Models/post-card.model';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss'],
})
export class PostCardComponent implements OnInit, AfterViewChecked {
  @Input() postCardModel: PostCardModel;
  @HostBinding("class.col-lg-4") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-6") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewChecked(): void {
    
  }

}
