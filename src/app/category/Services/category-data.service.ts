import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable ({
    providedIn: 'root'
})
export class CategoryDataService {
    headers: Object;

    constructor(private http: HttpClient) {
        this.headers = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
    }

    addCategory(name: string, description: string): Observable<Object> {
        let observableObject: Observable<Object> = this.http.post(
            "/Categories",
            JSON.stringify({
                Name: name,
                Description: description
            }),
            this.headers
        );

        return observableObject;
    }

    updateCategory(id: string, description: string): Observable<Object> {
        let url: string = "/Categories/" + id;
        
        let observableObject: Observable<Object> = this.http.post(
            url,
            JSON.stringify({
                Description: description
            }),
            this.headers
        );

        return observableObject;
    }

    getCategories(): Observable<Object> {
        let observableObject: Observable<Object> = this.http.get("/Categories");
        return observableObject;
    }
}