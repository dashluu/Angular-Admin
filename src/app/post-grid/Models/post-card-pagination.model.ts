import { PostCardModel } from "@app/post-grid/Models/post-card.model";

export class PostCardPaginationModel {
    postCards: PostCardModel[];
    pageNumber: number;
    pageSize: number;
    pages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}