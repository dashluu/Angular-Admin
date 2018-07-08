import { Injectable } from "@angular/core";
import { CategoryListComponent } from "@app/category/category-list/category-list.component";
import { CategoryModel } from "@app/category/Models/category.model";
import { CategoryCardComponent } from "@app/category/category-list/category-card/category-card.component";
import { CategoryEditorComponent } from "@app/category/category-editor/category-editor.component";

@Injectable({
    providedIn: 'root'
})
export class CategoryUIService {
    categoryList: CategoryListComponent;
    categoryEditor: CategoryEditorComponent;
    selectedCategoryCard: CategoryCardComponent;

    constructor() {}

    getCategoryId(): string {
        return this.selectedCategoryCard.getCategoryId();
    }

    setCategoryList(categoryListParam: CategoryListComponent) {
        this.categoryList = categoryListParam;
    }

    setCategoryEditor(categoryEditorParam: CategoryEditorComponent) {
        this.categoryEditor = categoryEditorParam;
    }

    selectCategoryCard(categoryCard: CategoryCardComponent) {
        this.selectedCategoryCard = categoryCard;
        this.categoryEditor.setCategoryName(this.selectedCategoryCard.getCategoryName());
        this.categoryEditor.setCategoryDescription(this.selectedCategoryCard.getCategoryDescription());
        this.categoryEditor.editModeOn();
    }

    addCategoryCallback(id: string) {
        let categoryModel: CategoryModel = {
            id: id,
            name: this.categoryEditor.getCategoryName(),
            description: this.categoryEditor.getCategoryDescription(),
            postCount: 0
        };
        
        this.categoryList.createCategoryCard(categoryModel);
        this.categoryEditor.clearInput();
    }

    updateCategoryCallback() {
        this.selectedCategoryCard.setCategoryDescription(this.categoryEditor.getCategoryDescription());
        this.categoryEditor.clearInput();
    }
}