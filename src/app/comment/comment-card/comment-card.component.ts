import { Component, OnInit, Input, HostBinding, Output, EventEmitter } from '@angular/core';
import { CommentModel } from '@app/comment/Models/comment.model';
import { CommentUIService } from '@app/comment/Services/comment-ui.service';

@Component({
  selector: 'app-comment-card',
  templateUrl: './comment-card.component.html',
  styleUrls: ['./comment-card.component.scss']
})
export class CommentCardComponent implements OnInit {
  commentModel: CommentModel;
  actionable: boolean;
  
  @HostBinding("class.col-lg-12") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-12") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;

  constructor(private commentUIService: CommentUIService) {}

  ngOnInit() {
  }

  showChildComments() {
    this.commentUIService.showChildComments(this.commentModel);
  }

  deleteComment() {
    this.commentUIService.deleteComment(this.commentModel.id);
  }
}
