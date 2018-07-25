import { UserModel } from "@app/user/Models/user.model";

export class UserPaginationModel {
    users: UserModel[];
    pageNumber: number;
    pageSize: number;
    pages: number;
    hasNext: boolean;
    hasPrevious: boolean;
}