import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountPostsComponent } from './account-posts/account-posts.component';
import { AccountLikesComponent } from './account-likes/account-likes.component';
import { AccountCommentsComponent } from './account-comments/account-comments.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { DetailsComponent } from './details/details.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        redirectTo: 'posts',
        pathMatch: 'full'
      },
      {
        path: 'posts',
        title: 'Your Confessions',
        component: AccountPostsComponent,
      },
      {
        path: 'likes',
        title: 'Your Liked Confessions',
        component: AccountLikesComponent,
      },
      {
        path: 'comments',
        title: 'Your Comments',
        component: AccountCommentsComponent,
      },
      {
        path: 'notifications',
        title: 'Your Notifications',
        component: NotificationsComponent,
      },
      {
        path: 'details',
        title: 'Your Details',
        component: DetailsComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [],
})
export class AccountRoutingModule {}
