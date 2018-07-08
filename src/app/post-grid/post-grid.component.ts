import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver } from '@angular/core';
import { PostCardComponent } from '@app/post-grid/post-card/post-card.component';
import { PostCardModel } from '@app/post-grid/Models/post-card.model';
import { PostCardDataService } from '@app/post-grid/Services/post-card-data.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { PostCardMapperService } from '@app/post-grid/Services/post-card-mapper.service';
import { PostCardPaginationModel } from '@app/post-grid/Models/post-card-pagination.model';
import { PostGridUIService } from '@app/post-grid/Services/post-grid-ui.service';

@Component({
  selector: 'app-post-grid',
  templateUrl: './post-grid.component.html',
  styleUrls: ['./post-grid.component.scss']
})
export class PostGridComponent implements OnInit {
  @ViewChild('postCardGridContainer', { read: ViewContainerRef }) postCardGridContainer: any;
  componentRef: ComponentRef<PostCardComponent>;

  category: string = "";

  pageNumber: number;
  pages: number;

  searchPostCardPageNumber: number;
  searchPostCardPages: number;

  searchMode: boolean;

  postCardPageNumber: number;
  postCardPages: number;

  isPostCardGridEmpty: boolean;

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

        return this.postCardDataService.getPostCardPaginationModel(this.category, this.postCardPageNumber);
      })
    );

    observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getPostCardsCallback(object["data"]);
      }
    });

    this.postGridUIService.setPostGridUI(this);
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
    let observableObject: Observable<Object> = this.postCardDataService.getPostCardPaginationModel(this.category, this.postCardPageNumber);
    observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getPostCardsCallback(object["data"]);
      }
    });
  }

  deletePost(postId: string) {
    let warning: string = "Note:\n" +
      "This will delete all the comments and sub-comments which belong to this post.\n" +
      "Are you sure you want to delete this post?";

    var confirmDelete = confirm(warning);

    if (!confirmDelete) {
      return;
    }

    let observableObject: Observable<Object> = this.postCardDataService.deletePost(this.category, postId, this.postCardPageNumber);

    observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getPostCardsCallback(object["data"]);
      }
    });
  }

  getPostCardsCallback(object: Object) {
    let postCardPaginationModel: PostCardPaginationModel = this.postCardMapperService.mapObjectToPostCardPaginationModel(object);
    let postCardModels: PostCardModel[] = postCardPaginationModel.postCards;
    let postCardModelCount = postCardModels.length;

    this.postCardGridContainer.clear();

    for (var i = 0; i < postCardModelCount; i++) {
      this.createPostCard(postCardModels[i]);
    }

    this.postCardPageNumber = postCardPaginationModel.pageNumber;
    this.postCardPages = postCardPaginationModel.pages;

    this.pageNumber = this.postCardPageNumber;
    this.pages = this.postCardPages;

    this.resetSearchMode();

    this.isPostCardGridEmpty = this.pages === 0;
  }

  getNextPostCards() {
    this.postCardPageNumber++;
    this.getPostCards();
  }

  getPreviousPostCards() {
    this.postCardPageNumber--;
    this.getPostCards();
  }
}
