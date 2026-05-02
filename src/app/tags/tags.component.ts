import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfessionsService } from '../shared/services/confessions.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit {
  topTags: string[];
  trendingTags: string[];
  isLoading = true;
  private readonly minWidth = 55;
  private readonly maxWidth = 135;
  private readonly horizontalPadding = 24;
  topTagsPlaceholders = Array.from({ length: 50 }, () => this.randomWidth());
  trendingTagsPlaceholders = Array.from({ length: 25 }, () => this.randomWidth());

  constructor(
    private router: Router,
    private confessionsService: ConfessionsService
  ) {}

  newestClicked() {
    this.router.navigate(['/confessions'], {
      queryParams: { sort: 'newest' }
    });
  }

  trendingClicked() {
    this.router.navigate(['/confessions'], {
      queryParams: { sort: 'trending' }
    });
  }

  private randomWidth(): number {
    const min = this.minWidth - this.horizontalPadding;
    const max = this.maxWidth - this.horizontalPadding;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  async ngOnInit() {
    this.topTags = await this.confessionsService.getTopTags([]);
    this.trendingTags = await this.confessionsService.getTrendingTags([]);
    this.isLoading = false;
  }
}
