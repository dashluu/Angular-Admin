import { Component, OnInit, AfterViewChecked, HostBinding } from '@angular/core';
import { CategoryUIService } from '@app/category/Services/category-ui.service';
import { CategoryDataService } from '@app/category/Services/category-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit, AfterViewChecked {
  @HostBinding("class.col-lg-5") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-12") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;

  categoryNameInput: HTMLInputElement;
  categoryDescriptionInput: HTMLInputElement;
  addMode: boolean;

  constructor(private categoryDataService: CategoryDataService,
    private categoryUIService: CategoryUIService) {

    this.addMode = true;

  }

  ngOnInit() {
    this.categoryUIService.setCategoryEditor(this);
  }

  ngAfterViewChecked(): void {
    this.categoryNameInput = <HTMLInputElement>document.getElementById("category-name-input");
    this.categoryDescriptionInput = <HTMLInputElement>document.getElementById("category-description-input");
  }

  getCategoryName(): string {
    let categoryName: string = this.categoryNameInput.value;
    return categoryName;
  }

  getCategoryDescription(): string {
    let categoryDescription: string = this.categoryDescriptionInput.value;
    return categoryDescription;
  }

  setCategoryName(categoryName: string) {
    this.categoryNameInput.value = categoryName;
  }

  setCategoryDescription(categoryDescription: string) {
    this.categoryDescriptionInput.value = categoryDescription;
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

    let categoryDescription: string = this.getCategoryDescription().trim();

    let observableObject: Observable<Object> = this.categoryDataService.addCategory(categoryName, categoryDescription);

    observableObject.subscribe(object => {
      if (object["status"] === 200) {
        //Perform adding new row on UI service's table.
        this.categoryUIService.addCategoryCallback(object["data"]);
      }
    });
  }

  updateCategory() {
    let categoryId: string = this.categoryUIService.getCategoryId();
    let categoryDescription: string = this.getCategoryDescription();

    let observableObject: Observable<Object> = this.categoryDataService.updateCategory(categoryId, categoryDescription);

    observableObject.subscribe(object => {
      if (object["status"] === 200) {
        //Perform updating row on UI service's table.
        this.categoryUIService.updateCategoryCallback();
      }
    });
  }

}
