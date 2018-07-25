import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from '@app/user/user.component';
import { UserCardComponent } from '@app/user/user-card/user-card.component';
import { UserRoutingModule } from '@app/user/user-routing.module'

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule
  ],
  declarations: [UserComponent, UserCardComponent],
  entryComponents: [UserCardComponent]
})
export class UserModule { }
