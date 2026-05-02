import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CdkMenuModule } from '@angular/cdk/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ClickOutsideModule } from 'ng-click-outside';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ConfessionsRoutingModule } from './confessions-routing.module';
import { FeedComponent } from './feed/feed.component';
import { SingularComponent } from './singular/singular.component';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './feed/create/create.component';
import { ItemComponent } from './singular/item/item.component';
import { CommentComponent } from './singular/comment/comment.component';
import { CommentsComponent } from './singular/comments/comments.component';

@NgModule({
  declarations: [
    HomeComponent,
    SingularComponent,
    FeedComponent,
    CreateComponent,
    CommentComponent,
    CommentsComponent,
    ItemComponent,
  ],
  imports: [
    CommonModule,
    ConfessionsRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    CdkMenuModule,
    ClickOutsideModule,
    InfiniteScrollModule,
  ],
  providers: [],
})
export class ConfessionsModule {}
