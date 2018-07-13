import { Injectable } from "@angular/core";
import { CategoryListComponent } from "@app/category/category-list/category-list.component";
import { CategoryModel } from "@app/category/Models/category.model";
import { CategoryCardComponent } from "@app/category/category-list/category-card/category-card.component";
import { CategoryEditorComponent } from "@app/category/category-editor/category-editor.component";
import { CategoryMapperService } from "@app/category/Services/category-mapper.service";

@Injectable({
    providedIn: 'root'
})
export class CategoryUIService {
    categoryList: CategoryListComponent;
    categoryEditor: CategoryEditorComponent;
    selectedCategoryCard: CategoryCardComponent;

    constructor(private categoryMapperService: CategoryMapperService) {}

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

    addCategoryCallback(object: Object) {
        let categoryModel: CategoryModel = this.categoryMapperService.mapCategoryModelServerToClient(object);
        this.categoryList.createCategoryCard(categoryModel);
        this.categoryEditor.clearInput();
    }

    updateCategoryCallback() {
        this.selectedCategoryCard.setCategoryDescription(this.categoryEditor.getCategoryDescription());
        this.categoryEditor.clearInput();
    }
}