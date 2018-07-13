import { Injectable } from "@angular/core";
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { EditedCategoryModel } from "@app/category/Models/edited-category.model";
import { CategoryMapperService } from "@app/category/Services/category-mapper.service";

@Injectable ({
    providedIn: 'root'
})
export class CategoryDataService {

    constructor(
        private http: HttpClient,
        private categoryMapperService: CategoryMapperService
    ) 
    {
    }

    addCategory(editedCategoryModel: EditedCategoryModel): Observable<Object> {
        let url: string = "/Categories";
        let editedCategoryModelServer = this.categoryMapperService.mapEditedCategoryModelClientToServer(editedCategoryModel);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let observableObject: Observable<Object> = this.http.post(
            url,
            JSON.stringify(editedCategoryModelServer),
            options
        );

        return observableObject;
    }

    updateCategory(id: string, editedCategoryModel: EditedCategoryModel): Observable<Object> {
        let url: string = "/Categories/" + id;
        let editedCategoryModelServer = this.categoryMapperService.mapEditedCategoryModelClientToServer(editedCategoryModel);
        
        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let observableObject: Observable<Object> = this.http.post(
            url,
            JSON.stringify(editedCategoryModelServer),
            options
        );

        return observableObject;
    }

    getCategories(): Observable<Object> {
        let url: string = "/Categories";
        let observableObject: Observable<Object> = this.http.get(url);

        return observableObject;
    }
}