export const USER_BANNED = 'userBanned';

export function banUser() {
  localStorage.setItem(USER_BANNED, 'true');
  document.cookie = 'userBanned=true; path=/;';
}

export function isUserBanned(): boolean {
  return localStorage.getItem(USER_BANNED) === 'true' || document.cookie.includes('userBanned=true');
}
