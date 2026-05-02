import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Confession } from '../../shared/model/confession';
import { Injectable } from '@angular/core';
import { ConfessionsService } from '../../shared/services/confessions.service';

@Injectable()
export class ConfessionResolver implements Resolve<Confession> {
  constructor(
    private confessions: ConfessionsService,
    private router: Router
  ) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Confession> {
    const confessionId = route.paramMap.get('confessionId');
    let confession: any;
    try {
      confession = await this.confessions.getConfessionById(confessionId || '');
    } catch (e) {
      this.router.navigate(['/not-found']);
    }
    return confession;
  }
}
