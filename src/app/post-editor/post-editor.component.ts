import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, AfterViewInit } from '@angular/core';
import 'tinymce';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/code';
import 'tinymce/themes/modern';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { EditedPostDataService } from '@app/post-editor/Services/edited-post-data.service';
import { EditedPostMapperService } from '@app/post-editor/Services/edited-post-mapper.service';
import { EditedPostModel } from '@app/post-editor/Models/edited-post.model';
import { CategoryDataService } from '@app/category/Services/category-data.service';
import { CategoryModel } from '@app/category/Models/category.model';
import { CategoryMapperService } from '@app/category/Services/category-mapper.service';
import { Subscription, Observable, EMPTY } from 'rxjs';

declare var tinymce: any;

@Component({
  selector: 'app-post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  editor: any;
  postId: string = "";
  editedPostModel: EditedPostModel = new EditedPostModel();
  categoryModels: CategoryModel[];

  subscriptions: Subscription[] = [];

  @Output() onEditorContentChange = new EventEmitter();

  postCategory: HTMLSelectElement;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private editedPostDataService: EditedPostDataService,
    private categoryDataService: CategoryDataService,
    private editedPostMapperService: EditedPostMapperService,
    private categoryMapperService: CategoryMapperService
  ) 
  {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    //Define elements.
    this.postCategory = <HTMLSelectElement>document.getElementById("post-category");

    tinymce.init({
      selector: '#post-content',
      resize: false,
      plugins: "lists code",
      skin_url: '/assets/skins/lightgray',
      toolbar1: 'undo redo | bold italic underline | alignleft aligncenter alignright alignjustify',
      toolbar2: 'cut copy paste | numlist bullist | code',
      menubar: false,
      height: 350,
      setup: (editor: any) => {
        this.editor = editor;

        editor.on('keyup change', () => {
          const content = editor.getContent();
          this.onEditorContentChange.emit(content);
        });
      }
    });

    //Fetch post and category data.
    let categoryObservableObject: Observable<Object> = this.categoryDataService.getCategories();

    let subscription: Subscription = categoryObservableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.categoryModels = this.categoryMapperService.mapCategoryModelsServerToClient(object["data"]);

        for (var i = 0; i < this.categoryModels.length; i++) {
          let option: HTMLOptionElement = document.createElement("option");

          let categoryId: string = this.categoryModels[i].id;
          let categoryName: string = this.categoryModels[i].name;

          option.text = categoryName.toUpperCase();
          option.value = categoryId;
          this.postCategory.add(option);
        }
      }
    });

    this.subscriptions.push(subscription);

    let postObservableObject: Observable<Object> = this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.has("id")) {
          this.postId = params.get("id");
          return this.editedPostDataService.getEditedPostModel(this.postId);
        }

        return EMPTY;
      })
    );

    subscription = postObservableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.editedPostModel = this.editedPostMapperService.mapObjectToEditedPostModel(object["data"]);
        this.postCategory.value = this.editedPostModel.category.id;
        this.editor.setContent(this.editedPostModel.content);
      }
    });

    this.subscriptions.push(subscription);
  }

  ngOnDestroy(): void {
    tinymce.remove(this.editor);
    
    let subscriptionCount = this.subscriptions.length;

    for (let i = 0; i < subscriptionCount; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }

  submitEditedPost() {
    this.editedPostModel.content = this.editor.getContent();

    let categoryIndex: number = this.postCategory.selectedIndex;
    let categoryModel: CategoryModel = this.categoryModels[categoryIndex];

    this.editedPostModel.category = {
      id: categoryModel.id,
      name: categoryModel.name,
      postCount: categoryModel.postCount
    };

    if (this.postId === "") {
      let observableObject: Observable<Object> = this.editedPostDataService.addPost(this.editedPostModel);

      let subscription: Subscription = observableObject.subscribe(object => {
        if (object["status"] === 200) {
          this.editedPostModel.title = "";
          this.editedPostModel.shortDescription = "";
          this.editedPostModel.thumbnailImageSrc = "";
          this.editor.setContent("");
        }
      });

      this.subscriptions.push(subscription);
    }
    else {
      let observableObject: Observable<Object> = this.editedPostDataService.updatePost(this.postId, this.editedPostModel);

      let subscription: Subscription = observableObject.subscribe(object => {
        if (object["status"] === 200) {
          this.router.navigate(["/posts"]);
        }
      });

      this.subscriptions.push(subscription);
    }
  }

}