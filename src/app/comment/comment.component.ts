import { Component, OnInit, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, Input, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { CommentCardComponent } from '@app/comment/comment-card/comment-card.component';
import { CommentModel } from '@app/comment/Models/comment.model';
import { CommentDataService } from '@app/comment/Services/comment-data.service';
import { Observable, Subscription } from 'rxjs';
import { CommentPaginationModel } from '@app/comment/Models/comment-pagination.model';
import { CommentMapperService } from '@app/comment/Services/comment-mapper.service';
import { CommentUIService } from '@app/comment/Services/comment-ui.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, AfterViewInit, OnDestroy {
  pageNumber: number;
  pages: number;

  commentPageNumber: number;
  childCommentPageNumber: number;
  searchCommentPageNumber: number;

  commentPages: number;
  childCommentPages: number;
  searchCommentPages: number;
  
  selectedCommentModel: CommentModel;
  childMode: boolean;
  searchMode: boolean;
  isCommentListEmpty: boolean;
  postId: string;
  userName: string;

  @ViewChild('commentListContainer', { read: ViewContainerRef }) commentListContainer: any;
  @ViewChild('parentCommentContainer', { read: ViewContainerRef }) parentCommentContainer: any;
  componentRef: ComponentRef<CommentCardComponent>;

  commentSearchBox: HTMLInputElement;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private commentDataService: CommentDataService,
    private commentMapperService: CommentMapperService,
    private commentUIService: CommentUIService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) 
  {
  }

  ngOnInit() {
    let observableObject: Observable<Object> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("id")) {
          this.postId = params.get("id");
        }
        else if (params.has("name")) {
          this.userName = params.get("name");
        }

        this.pageNumber = 1;
        this.commentPageNumber = 1;
        this.isCommentListEmpty = true;

        this.resetChildMode();
        this.resetSearchMode();

        return this.commentDataService.getCommentPaginationModel(this.commentPageNumber, this.postId, this.userName);
      })
    );

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getCommentsCallback(object["data"]);
      }
    });

    this.subscriptions.push(subscription);

    this.commentUIService.setCommentUI(this);
  }

  ngAfterViewInit(): void {
    this.commentSearchBox = <HTMLInputElement>document.getElementById("comment-search-box");
  }

  ngOnDestroy(): void {
    if (this.componentRef !== undefined) {
      this.componentRef.destroy();
    }

    let subscriptionCount = this.subscriptions.length;

    for (let i = 0; i < subscriptionCount; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }

  resetChildMode() {
    this.childMode = false;
    this.childCommentPageNumber = 1;
  }

  resetSearchMode() {
    this.searchMode = false;
    this.searchCommentPageNumber = 1;
  }

  showChildComments(commentModel: CommentModel) {
    this.selectedCommentModel = commentModel;
    this.getChildComments();
  }

  createCommentCard(container: any, commentModel: CommentModel, actionable: boolean) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(CommentCardComponent);
    this.componentRef = container.createComponent(componentFactory);
    
    let commentCardComponent: CommentCardComponent = <CommentCardComponent>this.componentRef.instance;
    commentCardComponent.commentModel = commentModel;
    commentCardComponent.actionable = actionable;
  }

  getComments() {
    let observableObject: Observable<Object> = this.commentDataService.getCommentPaginationModel(this.commentPageNumber, this.postId, this.userName);
    
    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getCommentsCallback(object["data"]);
      }
    });

    this.subscriptions.push(subscription);
  }

  getCommentsCallback(object: Object) {
    let commentPaginationModel: CommentPaginationModel = this.commentMapperService.mapCommentPaginationModelServerToClient(object);

    this.clearParentCommentView();
    this.updateCommentListView(commentPaginationModel);

    this.commentPageNumber = commentPaginationModel.pageNumber;
    this.commentPages = commentPaginationModel.pages;

    this.pageNumber = this.commentPageNumber;
    this.pages = this.commentPages;

    this.resetChildMode();
    this.resetSearchMode();
    this.isCommentListEmpty = this.pages === 0;
  }

  getChildComments() {
    let observableObject: Observable<Object> = this.commentDataService.getChildCommentPaginationModel(this.selectedCommentModel.id, this.childCommentPageNumber);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        let commentPaginationModel: CommentPaginationModel = this.commentMapperService.mapCommentPaginationModelServerToClient(object["data"]);
        
        if (commentPaginationModel.comments.length == 0) {
          return;
        }

        let commentModel: CommentModel = {
          id: this.selectedCommentModel.id,
          userName: this.selectedCommentModel.userName,
          content: this.selectedCommentModel.content
        };

        this.updateParentCommentView(commentModel);
        this.updateCommentListView(commentPaginationModel);

        this.childCommentPageNumber = commentPaginationModel.pageNumber;
        this.childCommentPages = commentPaginationModel.pages;

        this.pageNumber = this.childCommentPageNumber;
        this.pages = this.childCommentPages;

        this.childMode = true;
        this.isCommentListEmpty = this.pages === 0;
      }
    });

    this.subscriptions.push(subscription);
  }

  searchCommentKeyEvent(event: any) {
    if (event.keyCode === 13) {
      this.searchCommentPageNumber = 1;
      this.searchComment();
    }
    else {
      let searchQuery: string = this.commentSearchBox.value.trim();

      if (searchQuery === "") {
        this.getComments();
      }
    }
  }

  searchComment() {
    let searchQuery: string = this.commentSearchBox.value.trim();

    if (searchQuery === "") {
      return;
    }

    let observableObject: Observable<Object> = this.commentDataService.getCommentPaginationModel(this.searchCommentPageNumber, this.postId, this.userName, searchQuery);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        let commentPaginationModel: CommentPaginationModel = this.commentMapperService.mapCommentPaginationModelServerToClient(object["data"]);
        
        this.clearParentCommentView();
        this.updateCommentListView(commentPaginationModel);
        
        this.searchCommentPageNumber = commentPaginationModel.pageNumber;
        this.searchCommentPages = commentPaginationModel.pages;

        this.pageNumber = this.searchCommentPageNumber;
        this.pages = this.searchCommentPages;
        
        this.resetChildMode();
        this.searchMode = true;
        this.isCommentListEmpty = this.pages === 0;
      }
    });

    this.subscriptions.push(subscription);
  }

  clearParentCommentView() {
    this.parentCommentContainer.clear();
  }

  clearCommentListView() {
    this.commentListContainer.clear();
  }

  updateParentCommentView(commentModel: CommentModel) {
    this.clearParentCommentView();
    this.createCommentCard(this.parentCommentContainer, commentModel, false);
  }

  updateCommentListView(commentPaginationModel: CommentPaginationModel) {
    this.clearCommentListView();
    let commentModels: CommentModel[] = commentPaginationModel.comments;
    let commentCount: number = commentModels.length;

    for (let i: number = 0; i < commentCount; i++) {
      this.createCommentCard(this.commentListContainer, commentModels[i], true);
    }
  }

  getNextComments() {
    if (!this.childMode) {
      if (!this.searchMode){
        this.commentPageNumber++;
        this.getComments();
      }
      else {
        this.searchCommentPageNumber++;
        this.searchComment();
      }
    }
    else {
      this.childCommentPageNumber++;
      this.getChildComments();
    }
  }

  getPreviousComments() {
    if (!this.childMode) {
      if (!this.searchMode) {
        this.commentPageNumber--;
        this.getComments();
      }
      else {
        this.searchCommentPageNumber--;
        this.searchComment();
      }
    }
    else {
      this.childCommentPageNumber--;
      this.getChildComments();
    }
  }

  backToParentComment() {
    if (!this.searchMode) {
      this.getComments();
    }
    else {
      this.searchComment();
    }
  }

  deleteComment(commentId: string) {
    let warning: string = "Note:\n" +
    "This will delete all the sub-comments which belong to this comment.\n" +
    "Are you sure you want to delete this comment?";

    var confirmDelete = confirm(warning);

    if (!confirmDelete) {
      return;
    }
    
    let observableObject: Observable<Object> = this.commentDataService.deleteComment(commentId, this.commentPageNumber, this.postId, this.userName);
    
    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getCommentsCallback(object["data"]);
      }
    });

    this.subscriptions.push(subscription);
  }

}
