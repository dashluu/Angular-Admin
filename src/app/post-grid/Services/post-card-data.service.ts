import { Injectable } from "@angular/core";
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostCardDataService {
    postCardPageSize: number = 3;
    
    constructor(private http: HttpClient) {
    }

    getPostCardPaginationModel(pageNumber: number, category?: string, searchQuery?: string): Observable<Object> {
        let url: string = "/Posts";

        let params: HttpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", this.postCardPageSize.toString());

        if (category) {
            params = params.set("category", category);
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

    deletePost(postId: string, pageNumber: number, category?: string): Observable<Object> {
        let url: string = "/Posts/" + postId;

        let params: HttpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", this.postCardPageSize.toString());

        if(category) {
            params = params.set("category", category);
        }

        let options = {
            params: params
        };

        let observableObject: Observable<Object> = this.http.delete(url, options);

        return observableObject;
    }
}