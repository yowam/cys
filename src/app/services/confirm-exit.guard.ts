import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
} from '@angular/router';
import { PostComponent } from '../post/post.component';

@Injectable()
export class ConfirmExitGuard implements CanDeactivate<PostComponent> {
  canDeactivate(
    component: PostComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ): boolean {
    if (component.post || component.tags.length) {
      return component.confirmExit();
    }
    return true;
  }
}
