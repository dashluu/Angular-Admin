import { EditedPostModel } from "@app/post-editor/Models/edited-post.model";
import { Injectable } from "@angular/core";
import { CategoryMapperService } from "@app/category/Services/category-mapper.service";
import { ImageModel } from "@app/post-editor/Models/image.model";
import { PostCategoryModel } from "@app/category/Models/post-category-model";

@Injectable({
    providedIn: 'root'
})
export class EditedPostMapperService {

    constructor(private categoryMapperService: CategoryMapperService) {

    }

    mapEditedPostModelServerToClient(object: Object): EditedPostModel {
        let editedPostModel: EditedPostModel = {
            title: object["Title"],
            category: this.categoryMapperService.mapPostCategoryModelServerToClient(object["PostCategory"]),
            shortDescription: object["ShortDescription"],
            content: object["Content"],
            thumbnailImageSrc: object["ThumbnailImageSrc"]
        };

        return editedPostModel;
    }

    mapEditedPostModelClientToServer(editedPostClientModel: EditedPostModel): Object {
        let postCategoryClientModel: PostCategoryModel = editedPostClientModel.category;

        let editedPostServerModel = {
            Title: editedPostClientModel.title,
            PostCategory: {
                CategoryId: postCategoryClientModel.id,
                Name: postCategoryClientModel.name,
                PostCount: postCategoryClientModel.postCount
            },
            ShortDescription: editedPostClientModel.shortDescription,
            Content: editedPostClientModel.content,
            ThumbnailImageSrc: editedPostClientModel.thumbnailImageSrc
        }

        return editedPostServerModel;
    }

    mapImageModelServerToClient(object: Object): ImageModel {
        let imageModel: ImageModel = {
            imageId: object["ImageId"],
            extension: object["Extension"]
        };

        return imageModel;
    }

    mapImageModelsServerToClient(objects: Object): ImageModel[] {
        let imageModels: ImageModel[] = []
        let objectCount: number = Object.keys(objects).length;

        for (let i = 0; i < objectCount; i++) {
            let imageModel: ImageModel = this.mapImageModelServerToClient(objects[i]);
            imageModels.push(imageModel);
        }

        return imageModels;
    }
}