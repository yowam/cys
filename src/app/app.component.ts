import { Component, OnInit } from '@angular/core';
import { AuthStore } from './services/auth.store';
import { isUserBanned } from './shared/utils/ban';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    standalone: false
})
export class AppComponent implements OnInit {
  isDecemberOrJanuary: boolean;
  banned = false;

  constructor(public auth: AuthStore) {}

  ngOnInit() {
    this.isDecemberOrJanuary = this._isDecemberOrJanuary();
    this.banned = isUserBanned();
  }

  private _isDecemberOrJanuary() {
    const currentMonth = new Date().getMonth();
    return currentMonth === 11 || currentMonth === 0; // 11 is December, 0 is January
  }
}
