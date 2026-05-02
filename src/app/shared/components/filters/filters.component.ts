import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ReactionType } from '../../model/reaction';
import { Sort } from 'src/app/confessions/home/home.component';

@Component({
    selector: 'app-filters',
    templateUrl: './filters.component.html',
    styleUrls: ['./filters.component.scss'],
    standalone: false
})
export class FiltersComponent implements OnInit {
  @Input() tagsEnabled = true;
  @Input() bestActive: any;
  @Input() newestEnabled = true;
  @Input() newestActive = false;
  @Input() trendingActive = false;
  @Input() trendingEnabled = false;
  @Input() reactionTypeEnabled = false;
  @Input() activeReaction: ReactionType | undefined;

  @Output() onNewestClicked = new EventEmitter();
  @Output() onTrendingClicked = new EventEmitter();
  @Output() onBestClicked = new EventEmitter<Sort>();
  @Output() onTagsClicked = new EventEmitter();

  isDesktopWidth = false;
  reactions = [
    {value: ReactionType.LIKE, label: 'Like'},
    {value: ReactionType.LOVE, label: 'Love'},
    {value: ReactionType.HAHA, label: 'Funny'},
    {value: ReactionType.WOW, label: 'Vomit'},
    {value: ReactionType.ANGRY, label: 'Anger'},
    {value: ReactionType.SAD, label: 'Fear'}
  ];
  Sort = Sort;

  ngOnInit() {
    this.isDesktopWidth = window.innerWidth < 768;
  }
}
