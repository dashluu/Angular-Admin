import { Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { EditedPostModel } from "@app/post-editor/Models/edited-post.model";
import { EditedPostMapperService } from "@app/post-editor/Services/edited-post-mapper.service";

@Injectable({
    providedIn: 'root'
})
export class EditedPostDataService {

    constructor(
        private http: HttpClient,
        private editedPostMapperService: EditedPostMapperService
    ) 
    {
    }

    getEditedPostModel(postId:string): Observable<Object> {
        let url: string = "/Posts/" + postId;
        let observableObject: Observable<Object> = this.http.get(url);

        return observableObject;
    }

    addPost(editedPostModel: EditedPostModel) {
        let url: string = "/Posts";

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let observableObject: Observable<Object> = this.http.post(
            url,
            JSON.stringify(this.editedPostMapperService.mapEditedPostModelClientToServer(editedPostModel)),
            options
        );

        return observableObject;
    }

    updatePost(postId: string, editedPostModel: EditedPostModel) {
        let url: string = "/Posts/" + postId;

        let options = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        };

        let observableObject: Observable<Object> = this.http.post(
            url,
            JSON.stringify(this.editedPostMapperService.mapEditedPostModelClientToServer(editedPostModel)),
            options
        );

        return observableObject;
    }

    uploadImages(formData: FormData) {
        let url: string = "/Images/New";
        let observableObject: Observable<Object> = this.http.post(url, formData);

        return observableObject;
    }

}