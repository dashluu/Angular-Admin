import { Component, OnInit, ViewChild, ViewContainerRef, ComponentRef, ComponentFactoryResolver, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserCardComponent } from '@app/user/user-card/user-card.component';
import { UserMapperService } from '@app/user/Services/user-mapper.service';
import { UserDataService } from '@app/user/Services/user-data.service';
import { UserModel } from '@app/user/Models/user.model';
import { UserPaginationModel } from '@app/user/Models/user-pagination.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, AfterViewInit, OnDestroy {
  pageNumber: number;
  pages: number;

  userPageNumber: number;
  searchUserPageNumber: number;

  userPages: number;
  searchUserPages: number;

  searchMode: boolean;
  isUserListEmpty: boolean;

  @ViewChild('userListContainer', { read: ViewContainerRef }) userListContainer: any;
  componentRef: ComponentRef<UserCardComponent>;

  userSearchBox: HTMLInputElement;

  subscriptions: Subscription[] = [];
  
  constructor(
    private userDataService: UserDataService,
    private userMapperService: UserMapperService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) 
  {

  }

  ngOnInit() {
    this.pageNumber = 1;
    this.userPageNumber = 1;
    this.isUserListEmpty = true;
    this.resetSearchMode();
    this.getUsers();
  }

  ngAfterViewInit(): void {
    this.userSearchBox = <HTMLInputElement>document.getElementById("user-search-box");
  }

  ngOnDestroy(): void {
    if (this.componentRef !== undefined) {
      this.componentRef.destroy();
    }

    let subscriptionCount = this.subscriptions.length;

    for (let i = 0; i < subscriptionCount; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }

  resetSearchMode() {
    this.searchMode = false;
    this.searchUserPageNumber = 1;
  }

  createUserCard(container: any, userModel: UserModel) {
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(UserCardComponent);
    this.componentRef = container.createComponent(componentFactory);

    let userCardComponent: UserCardComponent = <UserCardComponent>this.componentRef.instance;
    userCardComponent.userModel = userModel;
  }

  getUsers() {
    let observableObject: Observable<Object> = this.userDataService.getUserPaginationModel(this.userPageNumber);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.getUsersCallback(object["data"]);
      }
    });

    this.subscriptions.push(subscription);
  }

  getUsersCallback(object: Object) {
    let userPaginationModel: UserPaginationModel = this.userMapperService.mapUserPaginationModelServerToClient(object);

    this.updateUserListView(userPaginationModel);

    this.userPageNumber = userPaginationModel.pageNumber;
    this.userPages = userPaginationModel.pages;

    this.pageNumber = this.userPageNumber;
    this.pages = this.userPages;

    this.resetSearchMode();
    this.isUserListEmpty = this.pages === 0;
  }

  searchUser() {
    let searchQuery: string = this.userSearchBox.value.trim();

    if (searchQuery === "") {
      return;
    }

    let observableObject: Observable<Object> = this.userDataService.getUserPaginationModel(this.searchUserPageNumber, searchQuery);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        let userPaginationModel: UserPaginationModel = this.userMapperService.mapUserPaginationModelServerToClient(object["data"]);

        this.updateUserListView(userPaginationModel);

        this.searchUserPageNumber = userPaginationModel.pageNumber;
        this.searchUserPages = userPaginationModel.pages;

        this.pageNumber = this.searchUserPageNumber;
        this.pages = this.searchUserPages;

        this.searchMode = true;
        this.isUserListEmpty = this.pages === 0;
      }
    });

    this.subscriptions.push(subscription);
  }

  updateUserListView(userPaginationModel: UserPaginationModel) {
    this.clearUserListView();
    let userModels: UserModel[] = userPaginationModel.users;
    let userCount: number = userModels.length;

    for (let i: number = 0; i < userCount; i++) {
      this.createUserCard(this.userListContainer, userModels[i]);
    }
  }

  clearUserListView() {
    this.userListContainer.clear();
  }

  searchUserKeyEvent(event: any) {
    if (event.keyCode === 13) {
      this.searchUserPageNumber = 1;
      this.searchUser();
    }
    else {
      let searchQuery: string = this.userSearchBox.value.trim();

      if (searchQuery === "") {
        this.getUsers();
      }
    }
  }

  getNextUsers() {
    if (!this.searchMode) {
      this.userPageNumber++;
      this.getUsers();
    }
    else {
      this.searchUserPageNumber++;
      this.searchUser();
    }
  }

  getPreviousUsers() {
    if (!this.searchMode) {
      this.userPageNumber--;
      this.getUsers();
    }
    else {
      this.searchUserPageNumber--;
      this.searchUser();
    }
  }
}
