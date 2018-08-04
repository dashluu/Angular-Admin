import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class CommentDataService {
    commentPageSize: number = 3;

    constructor(private http: HttpClient) {
    }

    getCommentPaginationModel(pageNumber: number, postId?: string, userName?: string, searchQuery?: string): Observable<Object> {
        let url: string = "/Comments";

        let params: HttpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", this.commentPageSize.toString());

        if (postId) {
            params = params.set("postId", postId);
        }

        if (userName) {
            params = params.set("userName", userName);
        }

        if (searchQuery) {
            params = params.set("searchQuery", searchQuery);
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

    deleteComment(commentId: string, pageNumber: number, postId?: string, userName?: string, parentCommentId?: string): Observable<Object> {
        let url: string = "/Comments/" + commentId;

        let params: HttpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", this.commentPageSize.toString());

        if (postId) {
            params = params.set("postId", postId);
        }

        if (userName) {
            params = params.set("userName", userName);
        }

        if (parentCommentId) {
            params = params.set("parentCommentId", parentCommentId);
        }

        let options = {
            params: params
        };
        
        let observableObject: Observable<Object> = this.http.delete(url, options);

        return observableObject;
    }
}