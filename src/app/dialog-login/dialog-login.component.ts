import { Component } from '@angular/core';
import { DialogRef } from '@angular/cdk/dialog';
import { LoginComponent } from 'src/app/login/login.component';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss']
})
export class DialogLoginComponent {

  constructor(
    public dialogRef: DialogRef<string>,
  ) {}

}
