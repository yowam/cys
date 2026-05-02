import { Component, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ConfessionsService } from '../../services/confessions.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-search-input',
    templateUrl: './search-input.component.html',
    styleUrls: ['./search-input.component.scss'],
    standalone: false
})
export class SearchInputComponent {
  searchInput = '';
  inputFocused = false;

  @ViewChild('inputRef') public inputRef: ElementRef;
  @ViewChild('searchForm') public searchForm: NgForm;

  constructor(
    private confessionsService: ConfessionsService,
    private router: Router
  ) {}

  searchBoxClicked() {
    this.inputRef.nativeElement.focus();
  }

  onInputFocused() {
    this.inputFocused = true;
  }

  onInputBlurred() {
    this.inputFocused = false;
  }

  search() {
    if (! this.searchForm.valid || ! this.searchForm.value.search) {
      return;
    }

    this.router.navigate(['/search'], {queryParams: { term: this.searchForm.value.search }});
  }
}
