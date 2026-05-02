import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { Comment } from '../model/comment';
import { environment } from 'src/environments/environment';
import { AuthStore } from 'src/app/services/auth.store';

export interface Report {
  reportedId?: string,
  content?: string,
  type: 'comment' | 'confession' | 'message',
  message: string
}

@Injectable()
export class ReportService {
  constructor(private http: HttpClient, private auth: AuthStore) {}

  async report(report: Report) {
    const endpoint = `${environment.apiEndpoint}/api/report`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(endpoint, report, header)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      )
      .toPromise();
  }

  async ban(confessionId: String) {
    const endpoint = `${environment.apiEndpoint}/api/ban-ip`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(endpoint, { confessionId }, header)
      .pipe(
        map((response: any) => {
          return response.data;
        })
      )
      .toPromise();
  }
}
