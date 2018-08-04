import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { UserModel } from '@app/user/Models/user.model';
import { UserDataService } from '@app/user/Services/user-data.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit, OnDestroy {
  userModel: UserModel;
  subscriptions: Subscription[] = [];

  @HostBinding("class.col-lg-12") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-12") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;

  constructor(
    private userDataService: UserDataService
  ) 
  {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    let subscriptionCount = this.subscriptions.length;

    for (let i = 0; i < subscriptionCount; i++) {
      this.subscriptions[i].unsubscribe();
    }
  }

  userLockout() {
    let warning: string = "Note:\n" +
      "This will lock out the user.\n" +
      "The user will not be able to write comments and access to his/her information.\n" +
      "Are you sure you want to lock out this user?";

    var confirmLockout = confirm(warning);

    if (!confirmLockout) {
      return;
    }

    this.setUserLockout(true);
  }

  reverseUserLockout() {
    let warning: string = "Note:\n" +
      "This will enable user to write comments and access his/her information.\n" +
      "Are you sure you want to disable locking out this user?";

    var confirmReverseLockout = confirm(warning);

    if (!confirmReverseLockout) {
      return;
    }

    this.setUserLockout(false);
  }

  setUserLockout(lockout: boolean) {
    let observableObject: Observable<Object> = this.userDataService.setUserLockout(this.userModel.userName, lockout);

    let subscription: Subscription = observableObject.subscribe(object => {
      if (object["status"] === 200) {
        this.userModel.lockoutEnabled = lockout;
      }
    });

    this.subscriptions.push(subscription);
  }
}
