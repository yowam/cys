import { Component, OnInit, Inject } from '@angular/core';
import { Confession } from '../../model/confession';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';

export interface DialogData {
  confession: Confession;
}

@Component({
    selector: 'app-dialog-share',
    templateUrl: './dialog-share.component.html',
    styleUrls: ['./dialog-share.component.scss'],
    standalone: false
})
export class DialogShareComponent implements OnInit {
  linkCopied = false;
  link = '';

  constructor(
    public dialogRef: DialogRef<string>,
    @Inject(DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit() {
    this.link = `https://www.confessyoursins.online/confessions/${this.data.confession.id}/${this.data.confession.slug}`;
  }

  copyLink() {
    if (!navigator.clipboard) {
      return;
    }

    navigator.clipboard
      .writeText(this.link)
      .then(() => {
        this.linkCopied = true;
      },
      function(err) {
        console.error('Could not copy text: ', err);
      });

    this.linkCopied = true;
  }

  shareOnFacebook() {
    const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      this.link
    )}`;
    window.open(facebookShareUrl, '_blank');
  }

  shareOnTwitter() {
    const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      this.link
    )}&text=${encodeURIComponent('An anonymous confession')}`;
    window.open(twitterShareUrl, '_blank');
  }
}
