import { Component, OnInit, HostListener, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Confession } from '../../shared/model/confession';
import { ConfessionsService } from '../../shared/services/confessions.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-singular',
    templateUrl: './singular.component.html',
    styleUrls: ['./singular.component.scss'],
    standalone: false
})
export class SingularComponent implements OnInit, OnDestroy {
  confessions: Confession[] = [];
  activeConfessionIndex = 0;
  showSuicidePreventionMessage = false;
  isLoading = true;
  isLoadingMore = false;
  hasErrored = false;
  private destroy$ = new Subject<void>();
  @ViewChild('container') container: ElementRef;

  constructor(
    private confessionsService: ConfessionsService,
    protected route: ActivatedRoute
  ) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    // Check if the user has scrolled to the bottom of the page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      // console.log('bottomed');
    }
  }

  async ngOnInit() {
    this.confessions.push(this.route.snapshot.data['confession']);
    this.route.paramMap
      .pipe(takeUntil(this.destroy$))
      .subscribe(async () => {
        this.isLoading = true;
        this.confessions.push(this.route.snapshot.data['confession']);
        this.activeConfessionIndex = this.confessions.findIndex(confession => confession.id === this.route.snapshot.data['confession'].id);

        if (this.confessions[this.activeConfessionIndex].tags.length >= 5 && ! this.confessions[this.activeConfessionIndex].similarConfessions?.length) {
          this.confessions[this.activeConfessionIndex]['similarConfessions'] = await this.confessionsService.getSimilarConfessions(this.confessions[this.activeConfessionIndex].tags);
        }

        this.isLoading = false;
      });

    this.showSuicidePreventionMessage = this.confessions[this.activeConfessionIndex].tags.some(tag => tag.includes('suicid'));

    if (this.confessions[this.activeConfessionIndex].tags.length >= 5) {
      this.confessions[this.activeConfessionIndex]['similarConfessions'] = await this.confessionsService.getSimilarConfessions(this.confessions[this.activeConfessionIndex].tags);
    }

    this.isLoading = false;
  }

  ngOnDestroy(): void {
    // Trigger unsubscription
    this.destroy$.next();
    this.destroy$.complete();
  }

  async loadMoreConfessions() {
    if (! this.confessions[this.activeConfessionIndex].similarConfessions || ! this.confessions[this.activeConfessionIndex].similarConfessions?.length) {
      return;
    }

    if (this.isLoadingMore) {
      return;
    }

    this.isLoadingMore = true;

    const similarConfessions = this.confessions[this.activeConfessionIndex].similarConfessions || [];
    const similarConfessionsLastIndex = similarConfessions.length - 1;
    const cursor = similarConfessions[similarConfessionsLastIndex].score;

    let nextConfessions: Confession[] = [];

    nextConfessions = await this.confessionsService.getSimilarConfessions(this.confessions[this.activeConfessionIndex].tags, cursor);

    if (nextConfessions.length) {
      this.confessions[this.activeConfessionIndex].similarConfessions = similarConfessions.concat(nextConfessions);
    }
    this.isLoadingMore = false;
  }
}
