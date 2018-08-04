import { UserModel } from "@app/user/Models/user.model";
import { Injectable } from "@angular/core";
import { UserPaginationModel } from "@app/user/Models/user-pagination.model";

@Injectable({
    providedIn: 'root'
})
export class UserMapperService {
    mapUserModelServerToClient(object: Object): UserModel {
        let userModel: UserModel = {
            userName: object["UserName"],
            email: object["Email"],
            lockoutEnabled: object["LockoutEnabled"],
            isAdmin: object["IsAdmin"]
        };

        return userModel;
    }

    mapUserModelsServerToClient(objects: Object): UserModel[] {
        let objectCount: number = Object.keys(objects).length;
        let userModels: UserModel[] = [];

        for (let i: number = 0; i < objectCount; i++) {
            let userModel: UserModel = this.mapUserModelServerToClient(objects[i]);
            userModels.push(userModel);
        }

        return userModels;
    }

    mapUserPaginationModelServerToClient(object: Object): UserPaginationModel {
        
        let userPaginationModel: UserPaginationModel = {
            users: this.mapUserModelsServerToClient(object["Models"]),
            hasNext: object["HasNext"],
            hasPrevious: object["HasPrevious"],
            pages: object["Pages"],
            pageNumber: object["PageNumber"],
            pageSize: object["PageSize"]
        };

        return userPaginationModel;
    }
}