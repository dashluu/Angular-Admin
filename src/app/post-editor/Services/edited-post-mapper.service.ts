import { EditedPostModel } from "@app/post-editor/Models/edited-post.model";
import { Injectable } from "@angular/core";
import { CategoryMapperService } from "@app/category/Services/category-mapper.service";

@Injectable({
    providedIn: 'root'
})
export class EditedPostMapperService {

    constructor(private categoryMapperService: CategoryMapperService) {

    }

    mapObjectToEditedPostModel(object: Object): EditedPostModel {
        let editedPostModel: EditedPostModel = {
            title: object["Title"],
            category: this.categoryMapperService.mapPostCategoryModelServerToClient(object["PostCategory"]),
            shortDescription: object["ShortDescription"],
            content: object["Content"],
            thumbnailImageSrc: object["ThumbnailImageSrc"]
        };

        return editedPostModel;
    }

    mapEditedPostModelClientToServer(editedPostModelClient: EditedPostModel): Object {
        let editedPostModelServer = {
            Title: editedPostModelClient.title,
            PostCategory: {
                CategoryId: editedPostModelClient.category.id,
                Name: editedPostModelClient.category.name
            },
            ShortDescription: editedPostModelClient.shortDescription,
            Content: editedPostModelClient.content,
            ThumbnailImageSrc: editedPostModelClient.thumbnailImageSrc
        }

        return editedPostModelServer;
    }
}