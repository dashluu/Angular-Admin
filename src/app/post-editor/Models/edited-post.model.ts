import { PostCategoryModel } from "@app/category/Models/post-category-model";

export class EditedPostModel {
    title: string;
    category: PostCategoryModel;
    shortDescription: string;
    content: string;
    thumbnailImageSrc: string;

    constructor() {
        this.title = "";
        this.shortDescription = "";
        this.content = "";
        this.thumbnailImageSrc = "";
    }
}