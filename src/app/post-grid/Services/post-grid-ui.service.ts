import { Injectable } from "@angular/core";
import { PostGridComponent } from "@app/post-grid/post-grid.component";

@Injectable({
    providedIn: 'root'
})
export class PostGridUIService {
    postGridUI: PostGridComponent;

    constructor() { }

    setPostGridUI(postGridUIParam: PostGridComponent) {
        this.postGridUI = postGridUIParam;
    }

    deletePost(postId: string) {
        this.postGridUI.deletePost(postId);
    }
}