import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CommentDataService {
    commentPageSize: number = 1;

    constructor(private http: HttpClient) {
    }

    getCommentPaginationModel(pageNumber: number, postId?: string, searchQuery?: string): Observable<Object> {
        let url: string = "/Comments";

        let params: HttpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", this.commentPageSize.toString());

        if (postId) {
            params.set("postId", postId);
        }

        if (searchQuery) {
            params.set("searchQuery", searchQuery);
        }

        let options = {
            params: params
        };

        let observableObject: Observable<Object> = this.http.get(url, options);

        return observableObject;
    }

    getChildCommentPaginationModel(commentId: string, pageNumber: number): Observable<Object> {
        let url: string = "/Comments/" + commentId + "/ChildComments";

        let options = {
            params: new HttpParams()
                .set("pageNumber", pageNumber.toString())
                .set("pageSize", this.commentPageSize.toString())
        };

        let observableObject: Observable<Object> = this.http.get(url, options);

        return observableObject;
    }

    deleteComment(commentId: string, pageNumber: number, postId?: string): Observable<Object> {
        let url: string = "/Comments/" + commentId;

        let params: HttpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", this.commentPageSize.toString());

        if (postId) {
            params.set("postId", postId);
        }

        let options = {
            params: params
        };
        
        let observableObject: Observable<Object> = this.http.delete(url, options);

        return observableObject;
    }
}