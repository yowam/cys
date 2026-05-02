import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { Confession } from '../../shared/model/confession';
import { ConfessionsService } from '../../shared/services/confessions.service';

export enum Sort {
  Newest = 'newest',
  Trending = 'trending',
  BestMonth = 'month',
  BestYear = 'year',
  // BestAll = 'all'
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  confessions: Confession[];
  searchedTerm = '';
  searchedTag = '';
  isLoading = true;
  hasErrored = false;
  showTags = false;
  Sort = Sort;
  sort: Sort = Sort.Newest;
  sortLabels: {[key in Sort]: string} = {
    [Sort.Newest]: 'Newest',
    [Sort.Trending]: 'Trending',
    [Sort.BestMonth]: 'Best of This Month',
    [Sort.BestYear]: 'Best of This Year',
    // [Sort.BestAll]: 'Best of All Time',
  };
  isLoadingMore = false;
  protected destroyed$: Subject<void> = new Subject<void>();

  constructor(
    private confessionsService: ConfessionsService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private router: Router
  )
  {}

  async ngOnInit() {
    this.router.events
      .pipe(
        takeUntil(this.destroyed$),
        filter(event => event instanceof NavigationStart)
      )
      .subscribe(async (event: any) => {
        this.hasErrored = false;
        // console.log('event: ', event);
        // if (event.url.includes('search') && ! this.searchedTerm) {
        //   this.searchedTerm = decodeURI(event.url.split('search=')[1].split('"')[0]);
        //   return this.confessions = await this.confessionsService.getConfessionSearch(
        //     this.searchedTerm
        //   );
        // }

        if (event.url.includes('search')) {
          const queryString = event.url.split('?')[1] || '';
          const params = new URLSearchParams(queryString);

          const newSearchTag = params.get('tag');
          const newSearchTerm = params.get('term');

          if (newSearchTag) {
            if (this.searchedTag !== newSearchTag) {
              this.isLoading = true;
              this.searchedTerm = '';
              this.searchedTag = newSearchTag;
              this.titleService.setTitle(`Confession results under "${this.searchedTag}"`);
              try {
                this.confessions = await this.confessionsService.getConfessionTag(
                  this.searchedTag
                );
                this.isLoading = false;
              } catch {
                this.hasErrored = true;
              }
              return;
            } else {
              return;
            }
          }

          if (newSearchTerm) {
            if (this.searchedTerm !== newSearchTerm) {
              this.isLoading = true;
              this.searchedTag = '';
              this.searchedTerm = newSearchTerm;
              this.titleService.setTitle(`Confession results for "${this.searchedTerm}"`);
              try {
                this.confessions = await this.confessionsService.getConfessionSearch(
                  this.searchedTerm
                );
                this.isLoading = false;
              } catch {
                this.hasErrored = true;
              }
              return;
            } else {
              return;
            }
          }
        }

        // if (this.activatedRoute.snapshot.queryParams['term']) {
        //   return;
        // }

        if (['/'].includes(event.url)) {
          this.titleService.setTitle(`Confessions`);
          try {
            this.confessions = await this.confessionsService.getConfessionFeed(this.sort);
            this.isLoading = false;
          } catch {
            this.hasErrored = true;
          }
          return;
        }

        if (event.url.includes('?sort=')) {
          const newSort = event.url.split('?sort=')[1].split('"')[0];
          if (newSort !== this.sort) {
            this.sort = newSort;
            this.sortNewConfessions();
          }
        }

        return;
      });

    if (this.activatedRoute.snapshot.queryParams['tag']) {
      this.searchedTag = this.activatedRoute.snapshot.queryParams['tag'];
      try {
        this.confessions = await this.confessionsService.getConfessionTag(
          this.searchedTag
        );
        this.isLoading = false;
      } catch {
        this.hasErrored = true;
      }
      this.titleService.setTitle(`Confession results under "${this.searchedTag}"`);
    } else if (this.activatedRoute.snapshot.queryParams['term']) {
      this.searchedTerm = this.activatedRoute.snapshot.queryParams['term'];
      try {
        this.confessions = await this.confessionsService.getConfessionSearch(
          this.searchedTerm
        );
        this.isLoading = false;
      } catch {
        this.hasErrored = true;
      }
      this.titleService.setTitle(`Confession results for "${this.searchedTerm}"`);
    } else {

      if (this.activatedRoute.snapshot.queryParams['sort']) {
        this.sort = this.activatedRoute.snapshot.queryParams['sort'];
        this.titleService.setTitle(`Confessions : ${this.sortLabels[this.sort]}`);
      }
      this.titleService.setTitle(`Confessions`);
      try {
        this.confessions = await this.confessionsService.getConfessionFeed(this.sort);
        this.isLoading = false;
      } catch {
        this.hasErrored = true;
      }
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  async sortNewConfessions() {
    this.hasErrored = false;

    this.router.navigate(
      [],
      {
        relativeTo: this.activatedRoute,
        queryParams: {
          sort: this.sort
        },
        queryParamsHandling: 'merge', // remove to replace all query params by provided
      }
    );
    this.isLoading = true;
    this.confessions = [];
    try {
      this.confessions = await this.confessionsService.getConfessionFeed(this.sort);
      this.isLoading = false;
    } catch {
      this.hasErrored = true;
    }
    this.titleService.setTitle(`Confessions : ${this.sortLabels[this.sort]}`);
  }

  async loadMoreConfessions() {
    if (!this.confessions || ! this.confessions.length) {
      return;
    }

    if (this.isLoadingMore) {
      return;
    }

    this.isLoadingMore = true;

    const cursor = this.confessions[this.confessions.length - 1].id;
    const skip = this.confessions.length;
    let nextConfessions: Confession[] = [];

    if (this.searchedTag) {
      nextConfessions = await this.confessionsService.getConfessionTag(this.searchedTag, cursor);
    } else if (this.searchedTerm) {
      nextConfessions = await this.confessionsService.getConfessionSearch(this.searchedTerm, skip);
    } else {
      nextConfessions = await this.confessionsService.getConfessionFeed(this.sort, cursor);
    }
    this.confessions = this.confessions.concat(nextConfessions);
    this.isLoadingMore = false;
  }
}
