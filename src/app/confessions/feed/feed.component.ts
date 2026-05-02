import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Confession } from '../../shared/model/confession';
import { ConfessionsService } from '../../shared/services/confessions.service';

@Component({
    selector: 'app-feed',
    templateUrl: './feed.component.html',
    styleUrls: ['./feed.component.scss'],
    standalone: false
})
export class FeedComponent implements OnInit {
  @Input() items: Confession[];
  @Input() routerOutletActive = false;
  @Input() routerOutletRef?: any;
  trackById (index: number, confession: Confession) {
    return confession.id;
  }
  @Output() loadMoreConfessions = new EventEmitter();

  constructor(
    private confessionService: ConfessionsService,
  ) {}

  ngOnInit() {}

  onScrolled(): void {
    // console.log('scroll');
    this.loadMoreConfessions.emit();
  }
}
