import { Component } from '@angular/core';
import { ConfessionsService } from '../../shared/services/confessions.service';
import { Confession } from '../../shared/model/confession';

@Component({
  selector: 'app-account-posts',
  templateUrl: './account-posts.component.html',
  styleUrls: ['./account-posts.component.scss']
})
export class AccountPostsComponent {
  userConfessions: Confession[];
  endOfConfessions = false;
  isLoading = false;
  trackById (index: number, confession: Confession) {
    return confession.id;
  }

  constructor(
    private confessions: ConfessionsService,
  ) {}

  async ngOnInit() {
    this.userConfessions = await this.confessions.getUserConfessions();

    if (this.userConfessions.length < 5) {
      this.endOfConfessions = true;
    }
  }

  async loadMore() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    const nextConfessions = await this.confessions.getUserConfessions(
      this.userConfessions[this.userConfessions.length - 1].id
    )
    if (nextConfessions.length < 5) { // 5 is page size on BE
      this.endOfConfessions = true;
    }
    this.userConfessions = this.userConfessions.concat(nextConfessions);
    this.isLoading = false;
  }
}
