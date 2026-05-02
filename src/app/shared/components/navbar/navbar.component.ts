import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthStore } from '../../../services/auth.store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  NotificationService,
  LAST_NOTIFICATION_CHECK,
  NOTIFICATION_UNREAD
} from '../../services/notification.service';
import { Notification, NotificationContent } from '../../model/notification';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
  expandedIndex = 0;
  loggedIn: boolean;
  notificationParsedContent: NotificationContent[] = [];
  userNotifications: Notification[] = [];
  hasUnreadNotifications = false;
  protected destroyed$: Subject<void> = new Subject<void>();

  constructor(
    public auth: AuthStore,
    private notificationService: NotificationService,
  ) {}

  async ngOnInit() {
    this.auth.isLoggedIn$
      .pipe(takeUntil(this.destroyed$))
      .subscribe((loggedIn) => this.loggedIn = loggedIn);

    if (this.loggedIn) {
      this.doNotificationChecks();
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  logout() {
    this.auth.logout();
  }

  async doNotificationChecks() {
    const lastCheck = Number(localStorage.getItem(LAST_NOTIFICATION_CHECK));
    const now = new Date();
    const fiveMinutesAgo = new Date(now.getTime() - 5 * 60 * 1000).getTime();
    if (!lastCheck || lastCheck < fiveMinutesAgo) {
      const res: any = await this.notificationService.userHasUnreadNotifications();
      localStorage.setItem(LAST_NOTIFICATION_CHECK, String(new Date().getTime()));
      if (res.hasUnreadNotifications) {
        localStorage.setItem(NOTIFICATION_UNREAD, 'true');
      }
    }
    this.hasUnreadNotifications = localStorage.getItem(NOTIFICATION_UNREAD) === 'true';

    this.userNotifications = await this.notificationService.getUserNotifications();
    this.notificationParsedContent = this.userNotifications.map(notification => JSON.parse(notification.content));
  }

  async markAllAsRead() {
    const res = await this.notificationService.markAsReadNotifications(this.userNotifications.map(notification => notification.id));
    if (res) {
      this.userNotifications.forEach(notification => notification.isRead = true);
    }
  }
}
