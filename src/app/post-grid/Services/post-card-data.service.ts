import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostCardDataService {
    postCardPageSize: number = 3;
    
    constructor(private http: HttpClient) {
    }

    getPostCardPaginationModel(category: string, pageNumber: number): Observable<Object> {
        let url: string = "/Posts";
        
        let options = {
            params: new HttpParams()
                .set("category", category)
                .set("pageNumber", pageNumber.toString())
                .set("pageSize", this.postCardPageSize.toString())
        };

        let observableObject: Observable<Object> = this.http.get(url, options);

        return observableObject;
    }

    deletePost(category: string, postId: string, pageNumber: number): Observable<Object> {
        let url: string = "/Posts/" + postId;

        let options = {
            params: new HttpParams()
                .set("category", category)
                .set("pageNumber", pageNumber.toString())
                .set("pageSize", this.postCardPageSize.toString())
        };

        let observableObject: Observable<Object> = this.http.delete(url, options);

        return observableObject;
    }
}