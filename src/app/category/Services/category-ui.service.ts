import { Injectable } from "@angular/core";
import { CategoryTableComponent } from "@app/category/category-table/category-table.component";
import { CategoryModel } from "@app/category/Models/category.model";
import { CategoryRowComponent } from "@app/category/category-table/category-row/category-row.component";
import { CategoryEditorComponent } from "@app/category/category-editor/category-editor.component";
import { CategoryComponent } from "@app/category/category.component";
import { CategoryDataService } from "@app/category/Services/category-data.service";
import { CategoryMapperService } from "@app/category/Services/category-mapper.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class CategoryUIService {
    categoryTable: CategoryTableComponent;
    categoryEditor: CategoryEditorComponent;
    categorySelectedRow: CategoryRowComponent;
    categoryUI: CategoryComponent;
    addMode: boolean;

    constructor(private CategoryDataService: CategoryDataService,
        private categoryMapperService: CategoryMapperService) {
        this.addMode = true;
    }

    getCategoryId(): string {
        return this.categorySelectedRow.getCategoryId();
    }

    setCategoryTable(categoryTableParam: CategoryTableComponent) {
        this.categoryTable = categoryTableParam;
    }

    setCategoryEditor(categoryEditorParam: CategoryEditorComponent) {
        this.categoryEditor = categoryEditorParam;
    }

    setCategoryUI(categoryUIParam: CategoryComponent) {
        this.categoryUI = categoryUIParam;
    }

    selectCategoryRecord(categorySelectedRowParam: CategoryRowComponent) {
        this.categorySelectedRow = categorySelectedRowParam;
        this.categoryEditor.setCategoryName(this.categorySelectedRow.getCategoryName());
        this.categoryEditor.setCategoryDescription(this.categorySelectedRow.getCategoryDescription());
        this.editModeOn();
    }

    addModeOn() {
        this.categoryEditor.disableCategoryName(false);

        if (!this.addMode) {
            this.categoryEditor.clear();
            this.categoryUI.toggleMode();
        }

        this.addMode = true;
    }

    editModeOn() {
        this.categoryEditor.disableCategoryName(true);

        if (this.addMode) {
            this.categoryUI.toggleMode();
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

    getCategories() {
        let observableObject: Observable<Object> = this.CategoryDataService.getCategories();

        observableObject.subscribe(object => {
            if (object["status"] === 200) {
                let categoryModels: CategoryModel[] = this.categoryMapperService.mapObjectsToCategoryModels(object["data"]);
                let categoryModelCount: number = categoryModels.length;

                for (let i: number = 0; i < categoryModelCount; i++) {
                    let categoryModel: CategoryModel = categoryModels[i];
                    this.categoryTable.createRow(categoryModel);
                }
            }
        });
    }

    addCategory() {
        let categoryName: string = this.categoryEditor.getCategoryName();
        let categoryDescription: string = this.categoryEditor.getCategoryDescription();

        let observableObject: Observable<Object> = this.CategoryDataService.addCategory(categoryName, categoryDescription);

        observableObject.subscribe(object => {
            if (object["status"] === 200) {
                //Perform adding new row on UI service's table.
                this.addCategoryCallback(object["data"]);
            }
        });
    }

    updateCategory() {
        let categoryName: string = this.categoryEditor.getCategoryName();
        let categoryDescription: string = this.categoryEditor.getCategoryDescription();
        let categoryId: string = this.getCategoryId();

        let observableObject: Observable<Object> = this.CategoryDataService.updateCategory(categoryId, categoryName, categoryDescription);

        observableObject.subscribe(object => {
            if (object["status"] === 200) {
                //Perform updating row on UI service's table.
                this.updateCategoryCallback();
            }
        });
    }

    addCategoryCallback(id: string) {
        let categoryModel: CategoryModel = {
            id: id,
            name: this.categoryEditor.getCategoryName(),
            description: this.categoryEditor.getCategoryDescription(),
            statistics: 0
        };
        this.categoryTable.createRow(categoryModel);
        this.categoryEditor.clear();
    }

    updateCategoryCallback() {
        this.categorySelectedRow.setCategoryName(this.categoryEditor.getCategoryName());
        this.categorySelectedRow.setCategoryDescription(this.categoryEditor.getCategoryDescription());
        this.categoryEditor.clear();
    }
}