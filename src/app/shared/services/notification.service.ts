import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStore } from '../../services/auth.store';
import { Notification } from '../../shared/model/notification';
import { banUser } from '../utils/ban';

export const LAST_NOTIFICATION_CHECK = 'last_notification_check';
export const NOTIFICATION_UNREAD = 'notification_read';

@Injectable()
export class NotificationService {
  constructor(private http: HttpClient, private auth: AuthStore) {}

  async userHasUnreadNotifications(): Promise<Notification[]> {
    const endpoint = `${environment.apiEndpoint}/api/has-unread-notifications`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }


    return this.http
      .post(endpoint, {}, header)
      .pipe(
        map((response: any) => response.hasUnreadNotifications)
      )
      .toPromise()
      .catch((error: any) => {
        console.error('Error fetching notifications:', error);

        if (error.error.message === 'Account Deleted') {
          this.auth.logout();
        }

        if (error.error.error === 'You are banned from using this service.') {
          this.auth.logout();
          banUser();
        }
      });
  }

  // TODO: Unread only
  async getUserNotifications(cursor?: string): Promise<Notification[]> {
    const endpoint = `${environment.apiEndpoint}/api/user-notifications`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    try {
      const response: any = await firstValueFrom(
        this.http.post(endpoint, { cursor }, header)
      );
      return response.data;
    } catch (error: any) {
      console.error('Error fetching notifications:', error);

      if (error.error.message === 'Account Deleted') {
        this.auth.logout();
      }

      if (error.error.error === 'You are banned from using this service.') {
        this.auth.logout();
        banUser();
      }

      return [];
    }
  }

  async markAsReadNotifications(ids: string[]) {
    const endpoint = `${environment.apiEndpoint}/api/read-notifications`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          ids
        },
        header
      )
      .pipe(
        map((response: any) => {
          if (response.data._count.notifications === 0) {
            localStorage.setItem(LAST_NOTIFICATION_CHECK, String(new Date().getTime()));
            localStorage.setItem(NOTIFICATION_UNREAD, 'false');
          }
          return response.data
        })
      )
      .toPromise();
  }

  async deleteNotification(id: string) {
    const endpoint = `${environment.apiEndpoint}/api/delete-notification`;
    const header = {
      headers: new HttpHeaders()
        .set('Authorization',  `Bearer ${this.auth.getToken()}`)
    }

    return this.http
      .post(
        endpoint, {
          id
        },
        header
      )
      .pipe(
        map((response: any) => response.data)
      )
      .toPromise();
  }
}
