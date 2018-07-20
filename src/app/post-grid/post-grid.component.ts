import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, OnDestroy, AfterViewInit } from '@angular/core';
import { PostCardComponent } from '@app/post-grid/post-card/post-card.component';
import { PostCardModel } from '@app/post-grid/Models/post-card.model';
import { PostCardDataService } from '@app/post-grid/Services/post-card-data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable, Subscription } from 'rxjs';
import { PostCardMapperService } from '@app/post-grid/Services/post-card-mapper.service';
import { PostCardPaginationModel } from '@app/post-grid/Models/post-card-pagination.model';
import { PostGridUIService } from '@app/post-grid/Services/post-grid-ui.service';

@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss']
})
export class PostGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('postCardGridContainer', { read: ViewContainerRef }) postCardGridContainer: any;
  componentRef: ComponentRef<PostCardComponent>;

  postSearchBox: HTMLInputElement;

  category: string;

  pageNumber: number;
  pages: number;

  searchPostCardPageNumber: number;
  searchPostCardPages: number;

  searchMode: boolean;

  postCardPageNumber: number;
  postCardPages: number;

  isPostCardGridEmpty: boolean;

  subscriptions: Subscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private postCardDataService: PostCardDataService,
    private postCardMapperService: PostCardMapperService,
    private postGridUIService: PostGridUIService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) 
  {
  }

  ngOnInit() {
    let observableObject: Observable<Object> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("name")) {
          this.category = params.get("name");
        }

        this.postCardPageNumber = 1;
        this.pageNumber = 1;
        this.isPostCardGridEmpty = true;

        this.resetSearchMode();

        return this.postCardDataService.getPostCardPaginationModel(this.postCardPageNumber, this.category);
      })
    );

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getPostCardsCallback(object["data"]);
      }
    });

    this.subscriptions.push(subscription);

    this.postGridUIService.setPostGridUI(this);
  }

  ngAfterViewInit(): void {
    this.postSearchBox = <HTMLInputElement>document.getElementById("post-search-box");
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

  resetSearchMode() {
    this.searchMode = false;
    this.searchPostCardPageNumber = 1;
  }

  createPostCard(postCardModel: PostCardModel) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(PostCardComponent);
    this.componentRef = this.postCardGridContainer.createComponent(componentFactory);
    this.componentRef.instance.postCardModel = postCardModel;
  }

  getPostCards() {
    let observableObject: Observable<Object> = this.postCardDataService.getPostCardPaginationModel(this.postCardPageNumber, this.category);
    
    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getPostCardsCallback(object["data"]);
      }
    });

    this.subscriptions.push(subscription);
  }

  searchPostKeyEvent(event: any) {
    if (event.keyCode === 13) {
      this.searchPostCardPageNumber = 1;
      this.searchPost();
    }
    else {
      let searchQuery: string = this.postSearchBox.value.trim();

      if (searchQuery === "") {
        this.getPostCards();
      }
    }
  }

  searchPost() {
    let searchQuery: string = this.postSearchBox.value.trim();

    if (searchQuery === "") {
      return;
    }

    let observableObject: Observable<Object> = this.postCardDataService.getPostCardPaginationModel(this.searchPostCardPageNumber, this.category, searchQuery);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        let postCardPaginationModel: PostCardPaginationModel = this.postCardMapperService.mapPostCardPaginationModelServerToClient(object["data"]);

        this.updatePostCardGridView(postCardPaginationModel);

        this.searchPostCardPageNumber = postCardPaginationModel.pageNumber;
        this.searchPostCardPages = postCardPaginationModel.pages;

        this.pageNumber = this.searchPostCardPageNumber;
        this.pages = this.searchPostCardPages;

        this.searchMode = true;
        this.isPostCardGridEmpty = this.pages === 0;
      }
    });

    this.subscriptions.push(subscription);
  }

  updatePostCardGridView(postCardPaginationModel: PostCardPaginationModel) {
    this.postCardGridContainer.clear();
    let postCardModels: PostCardModel[] = postCardPaginationModel.postCards;
    let postCardCount: number = postCardModels.length;

    for (let i: number = 0; i < postCardCount; i++) {
      this.createPostCard(postCardModels[i]);
    }
  }

  deletePost(postId: string) {
    let warning: string = "Note:\n" +
      "This will delete all the comments and sub-comments which belong to this post.\n" +
      "Are you sure you want to delete this post?";

    var confirmDelete = confirm(warning);

    if (!confirmDelete) {
      return;
    }

    let observableObject: Observable<Object> = this.postCardDataService.deletePost(postId, this.postCardPageNumber, this.category);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getPostCardsCallback(object["data"]);
      }
    });

    this.subscriptions.push(subscription);
  }

  getPostCardsCallback(object: Object) {
    let postCardPaginationModel: PostCardPaginationModel = this.postCardMapperService.mapPostCardPaginationModelServerToClient(object);
    
    this.updatePostCardGridView(postCardPaginationModel);

    this.postCardPageNumber = postCardPaginationModel.pageNumber;
    this.postCardPages = postCardPaginationModel.pages;

    this.pageNumber = this.postCardPageNumber;
    this.pages = this.postCardPages;

    this.resetSearchMode();

    this.isPostCardGridEmpty = this.pages === 0;
  }

  getNextPostCards() {
    if (!this.searchMode) {
      this.postCardPageNumber++;
      this.getPostCards();
    }
    else {
      this.searchPostCardPageNumber++;
      this.searchPost();
    }
  }

  getPreviousPostCards() {
    if (!this.searchMode) {
      this.postCardPageNumber--;
      this.getPostCards();
    }
    else {
      this.searchPostCardPageNumber--;
      this.searchPost();
    }
  }
}
