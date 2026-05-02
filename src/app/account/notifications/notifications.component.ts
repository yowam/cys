import { Component, OnInit } from '@angular/core';
import { NotificationService, NOTIFICATION_UNREAD } from '../../shared/services/notification.service';
import { Notification, NotificationContent } from '../../shared/model/notification';
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  userNotifications: Notification[];
  notificationParsedContent: NotificationContent[];
  endOfNotifications = false;
  isLoading = false;

  constructor(
    private notificationService: NotificationService
  ) {}

  async ngOnInit() {
    this.userNotifications = await this.notificationService.getUserNotifications();

    this.parseNotificationContent();

    if (this.userNotifications.length < 5) {
      this.endOfNotifications = true;
    }
  }

  markAsRead(id: string) {
    this.notificationService.markAsReadNotifications([id]);
  }

  async markAllAsRead() {
    const res = await this.notificationService.markAsReadNotifications(this.userNotifications.map(notification => notification.id));
    if (res) {
      this.userNotifications.forEach(notification => notification.isRead = true);
    }
  }

  deleteNotification(id: string) {
    this.notificationService.deleteNotification(id);
  }

  async loadMore() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    const nextNotifications = await this.notificationService.getUserNotifications(
      this.userNotifications[this.userNotifications.length - 1].id
    )
    if (nextNotifications.length < 5) { // 5 is page size on BE
      this.endOfNotifications = true;
    }
    this.userNotifications = this.userNotifications.concat(nextNotifications);

    this.parseNotificationContent();
    this.isLoading = false;
  }

  parseNotificationContent() {
    this.notificationParsedContent = this.userNotifications.map(notification => JSON.parse(notification.content));
    if (this.userNotifications.some(notification => !notification.isRead)) {
      localStorage.setItem(NOTIFICATION_UNREAD, 'true');
    }
  }
}
