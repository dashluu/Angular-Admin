import { Component, OnInit, HostBinding, AfterViewInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { CategoryUIService } from '@app/category/Services/category-ui.service';
import { CategoryDataService } from '@app/category/Services/category-data.service';
import { Observable, Subscription } from 'rxjs';
import { EditedCategoryModel } from '@app/category/Models/edited-category.model';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit, AfterViewInit, OnDestroy {
  @HostBinding("class.col-lg-5") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-12") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;

  editedCategoryModel: EditedCategoryModel = new EditedCategoryModel();

  addMode: boolean;

  categoryNameInput: HTMLInputElement;

  subscriptions: Subscription[] = [];

  constructor(
    private categoryDataService: CategoryDataService,
    private categoryUIService: CategoryUIService
  ) 
  {
    this.addMode = true;
  }

  ngOnInit() {
    this.categoryUIService.setCategoryEditor(this);
  }

  ngAfterViewInit(): void {
    this.categoryNameInput = <HTMLInputElement>document.getElementById("category-name-input");
  }

  ngOnDestroy(): void {
    let subscriptionCount = this.subscriptions.length;

    for (let i = 0; i < subscriptionCount; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }

  updateNameInput(event: any) {
    this.editedCategoryModel.name = event.target.value;
  }

  updateDescriptionInput(event: any) {
    this.editedCategoryModel.description = event.target.value;
  }

  getCategoryName(): string {
    let categoryName: string = this.editedCategoryModel.name;
    return categoryName;
  }

  getCategoryDescription(): string {
    let categoryDescription: string = this.editedCategoryModel.description;
    return categoryDescription;
  }

  setCategoryName(categoryName: string) {
    this.editedCategoryModel.name = categoryName;
  }

  setCategoryDescription(categoryDescription: string) {
    this.editedCategoryModel.description = categoryDescription;
  }

  clearInput() {
    this.setCategoryName("");
    this.setCategoryDescription("");
  }

  disableNameInput(disability: boolean) {
    this.categoryNameInput.disabled = disability;
  }

  toggleMode() {
    let editBtn: HTMLElement = document.getElementById("edit-category-btn");
    editBtn.classList.toggle("mode-btn");
    editBtn.classList.toggle("mode-btn-inactive");

    let addBtn: HTMLElement = document.getElementById("add-category-btn");
    addBtn.classList.toggle("mode-btn");
    addBtn.classList.toggle("mode-btn-inactive");
  }

  addModeOn() {
    this.disableNameInput(false);

    if (!this.addMode) {
      this.clearInput();
      this.toggleMode();
    }

    this.addMode = true;
  }

  editModeOn() {
    this.disableNameInput(true);

    if (this.addMode) {
      this.toggleMode();
    }

    this.addMode = false;
  }

  submitCategory() {
    if (this.addMode) {
      this.addCategory();
    }
    else {
      this.updateCategory();
    }
  }

  addCategory() {
    let categoryName: string = this.getCategoryName().trim();

    if (categoryName === "") {
      alert("Empty category name!");
      return;
    }

    let observableObject: Observable<Object> = this.categoryDataService.addCategory(this.editedCategoryModel);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.categoryUIService.addCategoryCallback(object["data"]);
      }
    });

    this.subscriptions.push(subscription);
  }

  updateCategory() {
    let categoryName: string = this.getCategoryName().trim();

    if (categoryName === "") {
      alert("Empty category name!");
      return;
    }

    let categoryId: string = this.categoryUIService.getCategoryId();

    let observableObject: Observable<Object> = this.categoryDataService.updateCategory(categoryId, this.editedCategoryModel);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.categoryUIService.updateCategoryCallback();
      }
    });

    this.subscriptions.push(subscription);
  }

}
