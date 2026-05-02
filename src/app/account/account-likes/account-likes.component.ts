import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReactionService } from '../../shared/services/reaction.service';
import { Reaction } from '../../shared/model/reaction';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ReactionType } from '../../shared/model/reaction';

@Component({
  selector: 'app-account-likes',
  templateUrl: './account-likes.component.html',
  styleUrls: ['./account-likes.component.scss']
})
export class AccountLikesComponent implements OnInit, OnDestroy {
  userReaction: Reaction[];
  activeReaction: ReactionType | undefined;
  endOfLikes = false;
  isLoading = false;
  protected destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private reactionService: ReactionService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter(event => event instanceof NavigationStart)
      )
      .subscribe((event: any) => {
        if (event.url.includes('reaction')) {
          this.activeReaction = event.url.split('reaction=')[1].split('"')[0];
          return this._updateReactions(this.activeReaction);
        }
        this.activeReaction = undefined;
        return this._updateReactions();
      });

    this.activeReaction = this.activatedRoute.snapshot.queryParams['reaction'];
    this._updateReactions(this.activeReaction);
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  async _updateReactions(reaction?: ReactionType) {
    this.userReaction = await this.reactionService.getUserReactions(reaction);

    this.endOfLikes = false;
    if (this.userReaction.length < 5) {
      this.endOfLikes = true;
    }
  }

  async loadMore() {
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    const nextReactions = await this.reactionService.getUserReactions(
      this.activeReaction,
      this.userReaction[this.userReaction.length - 1].id
    )
    if (nextReactions.length < 5) { // 5 is page size on BE
      this.endOfLikes = true;
    }
    this.userReaction = this.userReaction.concat(nextReactions);
    this.isLoading = false;
  }
}
