import { CategoryModel } from "@app/category/Models/category.model";
import { Injectable } from "@angular/core";
import { PostCategoryModel } from "@app/category/Models/post-category-model";
import { EditedCategoryModel } from "@app/category/Models/edited-category.model";

@Injectable({
    providedIn: 'root'
})
export class CategoryMapperService {
    mapCategoryModelServerToClient(object: Object): CategoryModel {
        let categoryModel: CategoryModel = {
            id: object["CategoryId"],
            name: object["Name"],
            description: object["Description"],
            postCount: object["PostCount"]
        };

        return categoryModel;
    }

    mapCategoryModelsServerToClient(objects: Object): CategoryModel[] {
        let objectCount: number = Object.keys(objects).length;
        let categoryModels: CategoryModel[] = [];

        for (let i: number = 0; i < objectCount; i++) {
            let categoryModel: CategoryModel = this.mapCategoryModelServerToClient(objects[i]);
            categoryModels.push(categoryModel);
        }

        return categoryModels;
    }

    mapPostCategoryModelServerToClient(object: Object): PostCategoryModel {
        let postCategoryModel: PostCategoryModel = {
            id: object["CategoryId"],
            name: object["Name"],
            postCount: object["PostCount"]
        };

        return postCategoryModel;
    }

    mapEditedCategoryModelClientToServer(editedCategoryModel: EditedCategoryModel): Object {
        let editedCategoryModelServer = {
            Name: editedCategoryModel.name,
            Description: editedCategoryModel.description
        };

        return editedCategoryModelServer;
    }
}