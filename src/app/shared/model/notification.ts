export interface Notification {
  belongsToId: string;
  confessionId: string;
  content: string;
  isRead: boolean;
  createdAt: string;
  id: string;
  updatedAt?: string;
}

export interface NotificationContent {
  message: string;
  confessionLink?: string;
  commentId?: string;
}

export interface NotificationWithParsedContent extends Notification {
  parsedContent: NotificationContent;
}
