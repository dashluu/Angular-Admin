import { PostCardModel } from "@app/post-grid/Models/post-card.model";
import { PostCardPaginationModel } from "@app/post-grid/Models/post-card-pagination.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PostCardMapperService {
    mapObjectToPostCardModel(object: Object): PostCardModel {
        let postCardModel: PostCardModel = {
            id: object["PostId"],
            title: object["Title"],
            createdDate: object["CreatedDate"],
            updatedDate: object["UpdatedDate"],
            shortDescription: object["ShortDescription"],
            thumbnailImageSrc: object["ThumbnailImageSrc"],
            commentCount: object["CommentCount"]
        };

        return postCardModel;
    }

    mapObjectsToPostCardModels(objects: Object): PostCardModel[] {
        let objectCount: number = Object.keys(objects).length;
        let postCardModels: PostCardModel[] = [];

        for (let i: number = 0; i < objectCount; i++) {
            let postCardModel: PostCardModel = this.mapObjectToPostCardModel(objects[i]);
            postCardModels.push(postCardModel);
        }

        return postCardModels;
    }

    mapObjectToPostCardPaginationModel(object: Object): PostCardPaginationModel {

        let postCardPaginationModel: PostCardPaginationModel = {
            postCards: this.mapObjectsToPostCardModels(object["Models"]),
            hasNext: object["HasNext"],
            hasPrevious: object["HasPrevious"],
            pages: object["Pages"],
            pageNumber: object["PageNumber"],
            pageSize: object["PageSize"]
        };

        return postCardPaginationModel;
    }
}