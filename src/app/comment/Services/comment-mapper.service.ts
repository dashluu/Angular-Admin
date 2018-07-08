import { CommentModel } from "@app/comment/Models/comment.model";
import { CommentPaginationModel } from "@app/comment/Models/comment-pagination.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CommentMapperService {
    mapObjectToCommentModel(object: Object): CommentModel {
        let commentModel: CommentModel = {
            id: object["CommentId"],
            content: object["Content"]
        };

        return commentModel;
    }

    mapObjectsToCommentModels(objects: Object): CommentModel[] {
        let objectCount: number = Object.keys(objects).length;
        let commentModels: CommentModel[] = [];

        for (let i: number = 0; i < objectCount; i++) {
            let commentModel: CommentModel = this.mapObjectToCommentModel(objects[i]);
            commentModels.push(commentModel);
        }

        return commentModels;
    }

    mapObjectToCommentPaginationModel(object: Object): CommentPaginationModel {
        
        let commentPaginationModel: CommentPaginationModel = {
            comments: this.mapObjectsToCommentModels(object["Models"]),
            hasNext: object["HasNext"],
            hasPrevious: object["HasPrevious"],
            pages: object["Pages"],
            pageNumber: object["PageNumber"],
            pageSize: object["PageSize"]
        };

        return commentPaginationModel;
    }
}