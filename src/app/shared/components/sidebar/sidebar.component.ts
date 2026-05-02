import { Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef, Input, OnDestroy } from '@angular/core';
import { Debounce } from '../../decorators/debounce.decorator';
import { Router, NavigationEnd } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() showSuicidePreventionMessage = false;
  isSideNavOpen = false;
  fixHoverWrap = false;
  hoverWrapPos: number;
  private destroy$ = new Subject<void>();
  @ViewChild('hoverWrap') hoverWrap: ElementRef;

  constructor(
    private router: Router,
  ) {
    // router.events.subscribe((val) => /*whatever*/)
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        this.updateFixedPos();
      });
  }

  ngAfterViewInit() {
    this.hoverWrapPos = this.hoverWrap.nativeElement.offsetTop;
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  @HostListener('window:scroll', ['$event'])
  @Debounce(15, false)
  onWindowScroll(event: Event) {
    this.updateFixedPos();
  }

  updateFixedPos() {
    const windowScroll = window.scrollY + 68; // 68 is nav header
    this.fixHoverWrap = windowScroll >= this.hoverWrapPos;
  }
}
