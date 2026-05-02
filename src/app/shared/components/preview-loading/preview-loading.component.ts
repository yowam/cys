import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview-loading',
  templateUrl: './preview-loading.component.html',
  styleUrls: ['./preview-loading.component.scss']
})
export class PreviewLoadingComponent implements OnInit {
  randomArray: Number[][] = Array(10).fill([0]);

  constructor() {}

  ngOnInit() {
    this.randomArray = this.randomArray.map(() =>
      Array(this.getRandomNumber(false)).fill(this.getRandomNumber(true)));
  }

  getRandomNumber(isWidth: boolean): Number {
    if (isWidth) {
      return Math.floor(Math.random() * (90 - 10 + 1)) + 10;
    }
    return Math.floor(Math.random() * 5) + 1;
  }
}
