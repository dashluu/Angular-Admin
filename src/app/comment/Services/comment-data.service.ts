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

    getCommentPaginationModel(postId:string, pageNumber: number): Observable<Object> {
        let url: string = "/Comments";

        let options = {
            params: new HttpParams()
                .set("postId", postId)
                .set("pageNumber", pageNumber.toString())
                .set("pageSize", this.commentPageSize.toString())
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

    searchCommentWithPaginationModel(postId: string, searchQuery: string, pageNumber: number): Observable<Object> {
        let url: string = "/Comments/Search";
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: new HttpParams()
                .set("postId", postId)
                .set("pageNumber", pageNumber.toString())
                .set("pageSize", this.commentPageSize.toString())
        };
        
        let observableObject: Observable<Object> = this.http.post(
            url,
            JSON.stringify({
                Query: searchQuery
            }),
            options
        );

        return observableObject;
    }

    deleteComment(postId: string, commentId: string, pageNumber: number): Observable<Object> {
        let url: string = "/Comments/" + commentId;

        let options = {
            params: new HttpParams()
                .set("postId", postId)
                .set("pageNumber", pageNumber.toString())
                .set("pageSize", this.commentPageSize.toString())
        };
        
        let observableObject: Observable<Object> = this.http.delete(url, options);

        return observableObject;
    }
}