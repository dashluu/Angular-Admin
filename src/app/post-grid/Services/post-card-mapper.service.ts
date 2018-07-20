import { PostCardModel } from "@app/post-grid/Models/post-card.model";
import { PostCardPaginationModel } from "@app/post-grid/Models/post-card-pagination.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PostCardMapperService {
    mapPostCardModelServerToClient(object: Object): PostCardModel {
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

    mapPostCardModelsServerToClient(objects: Object): PostCardModel[] {
        let objectCount: number = Object.keys(objects).length;
        let postCardModels: PostCardModel[] = [];

        for (let i: number = 0; i < objectCount; i++) {
            let postCardModel: PostCardModel = this.mapPostCardModelServerToClient(objects[i]);
            postCardModels.push(postCardModel);
        }

        return postCardModels;
    }

    mapPostCardPaginationModelServerToClient(object: Object): PostCardPaginationModel {
        let postCardPaginationModel: PostCardPaginationModel = {
            postCards: this.mapPostCardModelsServerToClient(object["Models"]),
            hasNext: object["HasNext"],
            hasPrevious: object["HasPrevious"],
            pages: object["Pages"],
            pageNumber: object["PageNumber"],
            pageSize: object["PageSize"]
        };

        return postCardPaginationModel;
    }
}