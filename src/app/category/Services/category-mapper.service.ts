import { CategoryModel } from "@app/category/Models/category.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CategoryMapperService {
    mapObjectToCategoryModel(object: Object): CategoryModel {
        let categoryModel: CategoryModel = {
            id: object["CategoryId"],
            name: object["Name"],
            description: object["Description"],
            postCount: object["PostCount"]
        };

        return categoryModel;
    }

    mapObjectsToCategoryModels(objects: Object): CategoryModel[] {
        let objectCount: number = Object.keys(objects).length;
        let categoryModels: CategoryModel[] = [];

        for (let i: number = 0; i < objectCount; i++) {
            let categoryModel: CategoryModel = this.mapObjectToCategoryModel(objects[i]);
            categoryModels.push(categoryModel);
        }

        return categoryModels;
    }
}