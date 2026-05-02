import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Reaction, ReactionType } from '../model/reaction';
import { environment } from 'src/environments/environment';
import { AuthStore } from 'src/app/services/auth.store';

@Injectable()
export class ReactionService {
  constructor(private http: HttpClient, private auth: AuthStore) {}

  async react(type: ReactionType, confessionId: string): Promise<Reaction> {
    const endpoint = `${environment.apiEndpoint}/api/reaction`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          type,
          confessionId
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

  async unreact(id: string, confessionId: string): Promise<Reaction> {
    const endpoint = `${environment.apiEndpoint}/api/delete-reaction`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          id,
          confessionId
        },
        header
      )
      .pipe(
        map((response: any) => response.data.data)
      )
      .toPromise();
  }

  async updateReaction(id: string, type: ReactionType): Promise<Reaction> {
    const endpoint = `${environment.apiEndpoint}/api/update-reaction`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          id,
          type
        },
        header
      )
      .pipe(
        map((response: any) => response.data)
      )
      .toPromise();
  }

  async getUserReactions(type?: ReactionType, cursor?: string) {
    const endpoint = `${environment.apiEndpoint}/api/user-reactions`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          type,
          cursor
        },
        header
      )
      .pipe(
        map((response: any) => response.data)
      )
      .toPromise();
  }
}
