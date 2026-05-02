import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountComponent } from './account.component';
import { AccountPostsComponent } from './account-posts/account-posts.component';
import { AccountLikesComponent } from './account-likes/account-likes.component';
import { AccountCommentsComponent } from './account-comments/account-comments.component';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AccountComponent,
    AccountPostsComponent,
    AccountLikesComponent,
    AccountCommentsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AccountRoutingModule,
  ],
  providers: [],
})
export class AccountModule {}
