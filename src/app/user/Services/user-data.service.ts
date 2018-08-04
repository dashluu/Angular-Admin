import { Observable } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    userPageSize: number = 1;

    constructor(private http: HttpClient) {
    }

    getUserPaginationModel(pageNumber: number, searchQuery?: string): Observable<Object> {
        let url: string = "/Users";

        let params: HttpParams = new HttpParams()
            .set("pageNumber", pageNumber.toString())
            .set("pageSize", this.userPageSize.toString());

        if (searchQuery) {
            params = params.set("searchQuery", searchQuery);
        }

        let options = {
            params: params
        };

        let observableObject: Observable<Object> = this.http.get(url, options);

        return observableObject;
    }

    setUserLockout(username: string, lockout: boolean): Observable<Object> {
        let url: string = "/Users/Lockout/" + username;

        let params: HttpParams = new HttpParams()
            .set("lockout", String(lockout));

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            }),
            params: params
        };

        let observableObject: Observable<Object> = this.http.post(url, "", options);

        return observableObject;
    }
}