import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { CategoryUIService } from '@app/category/Services/category-ui.service';

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.scss']
})
export class CategoryEditorComponent implements OnInit, AfterViewChecked {
  categoryNameInput: HTMLInputElement;
  categoryDescriptionInput: HTMLInputElement;

  constructor(private categoryUIService: CategoryUIService) { }

  ngOnInit() {
    this.categoryUIService.setCategoryEditor(this);
  }

  ngAfterViewChecked(): void {
    this.categoryNameInput = <HTMLInputElement>document.getElementById("category-name-input");
    this.categoryDescriptionInput = <HTMLInputElement>document.getElementById("category-description-input");
  }

  disableCategoryName(disability: boolean) {
    this.categoryNameInput.disabled = disability;
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

  clear() {
    this.setCategoryName("");
    this.setCategoryDescription("");
  }

}
