import { CommentModel } from "@app/comment/Models/comment.model";

export class CommentPaginationModel {
    comments: CommentModel[];
    pageNumber: number;
    pageSize: number;
    pages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}