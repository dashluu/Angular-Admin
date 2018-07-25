import { CommentModel } from "@app/comment/Models/comment.model";
import { CommentPaginationModel } from "@app/comment/Models/comment-pagination.model";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CommentMapperService {
    mapCommentModelServerToClient(object: Object): CommentModel {
        let commentModel: CommentModel = {
            id: object["CommentId"],
            userName: object["Username"],
            content: object["Content"]
        };

        return commentModel;
    }

    mapCommentModelsServerToClient(objects: Object): CommentModel[] {
        let objectCount: number = Object.keys(objects).length;
        let commentModels: CommentModel[] = [];

        for (let i: number = 0; i < objectCount; i++) {
            let commentModel: CommentModel = this.mapCommentModelServerToClient(objects[i]);
            commentModels.push(commentModel);
        }

        return commentModels;
    }

    mapCommentPaginationModelServerToClient(object: Object): CommentPaginationModel {
        
        let commentPaginationModel: CommentPaginationModel = {
            comments: this.mapCommentModelsServerToClient(object["Models"]),
            hasNext: object["HasNext"],
            hasPrevious: object["HasPrevious"],
            pages: object["Pages"],
            pageNumber: object["PageNumber"],
            pageSize: object["PageSize"]
        };

        return commentPaginationModel;
    }
}