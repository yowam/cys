import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Comment } from '../model/comment';
import { environment } from 'src/environments/environment';
import { AuthStore } from 'src/app/services/auth.store';

@Injectable()
export class CommentService {
  constructor(private http: HttpClient, private auth: AuthStore) {}

  async postComment(comment: string, confessionId: string, repliedTo?: string): Promise<Comment> {
    const endpoint = `${environment.apiEndpoint}/api/comment`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          body: comment,
          confessionId,
          repliedTo
        },
        header
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      )
      .toPromise();
  }

  async getUserComments(cursor?: string) {
    const endpoint = `${environment.apiEndpoint}/api/user-comments`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint,{
          cursor
        },
        header
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      )
      .toPromise();
  }

  async updateCommentStatus(commentId: string, contentStatus: string) {
    const endpoint = `${environment.apiEndpoint}/api/update-comment`;

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          id: commentId,
          contentStatus: contentStatus
        },
        header
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      )
      .toPromise();
  }
}
