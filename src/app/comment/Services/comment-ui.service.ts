import { Injectable } from "@angular/core";
import { CommentComponent } from "@app/comment/comment.component";
import { CommentModel } from "@app/comment/Models/comment.model";

@Injectable({
    providedIn: 'root'
})
export class CommentUIService {
    commentUI: CommentComponent;

    constructor() {}

    setCommentUI(commentUIParam: CommentComponent) {
        this.commentUI = commentUIParam;
    }

    showChildComments(commentModel: CommentModel) {
        this.commentUI.showChildComments(commentModel);
    }

    deleteComment(commentId: string) {
        this.commentUI.deleteComment(commentId);
    }
}