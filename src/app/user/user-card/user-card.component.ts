import { Component, OnInit, HostBinding } from '@angular/core';
import { UserModel } from '@app/user/Models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  userModel: UserModel;

  @HostBinding("class.col-lg-12") bootstrapLgClass: boolean = true;
  @HostBinding("class.col-md-12") bootstrapMdClass: boolean = true;
  @HostBinding("class.col-sm-12") bootstrapSmClass: boolean = true;
  @HostBinding("class.col-xs-12") bootstrapXsClass: boolean = true;

  constructor() { }

  ngOnInit() {
  }

}
