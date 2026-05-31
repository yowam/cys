import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { Confession } from '../../shared/model/confession';
import { environment } from 'src/environments/environment';
import { AuthStore } from 'src/app/services/auth.store';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ConfessionsService {
  constructor(private http: HttpClient, private auth: AuthStore) {}

  async postConfession(confession: string) {
    const loggedIn = await firstValueFrom(
      this.auth.isLoggedIn$.pipe(take(1))
    );

    const endpoint = loggedIn
    ? `${environment.apiEndpoint}/api/confession`
    : `${environment.apiEndpoint}/confession`;

    return this.http.post(
        endpoint, {
          body: confession
        },
        {
          headers: new HttpHeaders()
            .set('Authorization', `Bearer ${this.auth.getToken()}`)
        }
      )
      .pipe(
        map((response: any) => {
          return response.data;
        })
      ).toPromise();
  }

  async updateConfessionStatus(confessionId: string, contentStatus: string) {
    const endpoint = `${environment.apiEndpoint}/api/update-confession`;

    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          id: confessionId,
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

  async getUserConfessions(cursor?: string) {
    const endpoint = `${environment.apiEndpoint}/api/confessions`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint,
        {
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

  async getConfessionById(confessionId: string): Promise<Confession> {
    let endpoint = '';
    this.auth.isLoggedIn$.pipe(take(1)).subscribe(loggedIn =>
      endpoint = loggedIn ? `${environment.apiEndpoint}/api/get-confession` : `${environment.apiEndpoint}/get-confession`
    );
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
    .post(
      endpoint, {
        id: confessionId
      },
      header
      )
      .pipe(
        map((response: any) => response.data)
      )
      .toPromise();
  }

  async getSimilarConfessions(tags: string[], score?: number): Promise<Confession[]> {
    return this.http
      .post(
        `${environment.apiEndpoint}/similar`, { tags, afterScore: score }
        )
        .pipe(
          map((response: any) => response)
        )
        .toPromise();
  }

  async getConfessionFeed(sort?: string, cursor?: string): Promise<Confession[]> {
    let endpoint = '';
    this.auth.isLoggedIn$.pipe(take(1)).subscribe(loggedIn =>
      endpoint = loggedIn ? `${environment.apiEndpoint}/api/feed` : `${environment.apiEndpoint}/feed`
    );
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
    .post(
      endpoint,
      {
        sort,
        cursor
      },
      header
      )
      .pipe(
        map((response: any) => response.data)
      )
      .toPromise();
  }

  async getConfessionTag(tag: string, cursor?: string): Promise<Confession[]> {
    let endpoint = '';
    this.auth.isLoggedIn$.pipe(take(1)).subscribe(loggedIn =>
      endpoint = loggedIn ? `${environment.apiEndpoint}/api/tag` : `${environment.apiEndpoint}/tag`
    );
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
    .post(
      endpoint,
      {
        tag,
        cursor
      },
      header
      )
      .pipe(
        map((response: any) => response.data)
      )
      .toPromise();
  }

  async getConfessionSearch(query: string, skip?: number): Promise<Confession[]> {
    let endpoint = '';
    this.auth.isLoggedIn$.pipe(take(1)).subscribe(loggedIn =>
      endpoint = loggedIn ? `${environment.apiEndpoint}/api/search` : `${environment.apiEndpoint}/search`
    );
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
    .post(
      endpoint,
      {
        query,
        skip
      },
      header
      )
      .pipe(
        map((response: any) => {
          const sortedPosts = response.data.confessions.sort((a: any, b: any) => {
            return response.data.order.indexOf(a.id) - response.data.order.indexOf(b.id);
          });
          return sortedPosts;
        })
      )
      .toPromise();
  }

  async getTopTags(tags: string[]): Promise<string[]> {
    return this.http
      .get(
        `${environment.apiEndpoint}/top-tags`
        )
        .pipe(
          map((response: any) => response.data)
        )
        .toPromise();
  }

  async getTrendingTags(tags: string[]): Promise<string[]> {
    return this.http
      .get(
        `${environment.apiEndpoint}/trending-tags`
        )
        .pipe(
          map((response: any) => response.data)
        )
        .toPromise();
  }

}
