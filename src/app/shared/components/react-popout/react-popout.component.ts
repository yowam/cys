import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Reaction, ReactionType } from '../../model/reaction';
import { ReactionService } from '../../services/reaction.service';
import { AuthStore } from '../../../services/auth.store';
import { map, take, tap } from 'rxjs/operators';
import { Dialog } from '@angular/cdk/dialog';
import { DialogLoginComponent } from '../../../dialog-login/dialog-login.component';

@Component({
    selector: 'app-react-popout',
    templateUrl: './react-popout.component.html',
    styleUrls: ['./react-popout.component.scss'],
    standalone: false
})
export class ReactPopoutComponent {
  @Input() isReacting = false;
  @Input() confessionId: string;
  @Input() reaction: Reaction | undefined;
  @Output() onReactionChange = new EventEmitter<Reaction>();
  @Output() onInteraction = new EventEmitter<boolean>();
  ReactionType = ReactionType;

  constructor(
    private reactionService : ReactionService,
    private dialog: Dialog,
    private auth: AuthStore,
  ) {}

  async react(type: ReactionType) {
    this.auth.isLoggedIn$.pipe(take(1)).subscribe(async loggedIn => {
      if (loggedIn) {
        this.onInteraction.emit(true);
        if (this.reaction) {
          if (this.reaction.type === type) {
            return this._unreact();
          } else {
            return this._updateReaction(type);
          }
        }
        const newReaction = await this.reactionService.react(type, this.confessionId);

        this.onReactionChange.emit(newReaction);
        this.onInteraction.emit(false);
      } else {
        this.dialog.open<string>(DialogLoginComponent, {});
      }
    });
  }

  private async _unreact() {
    if (this.reaction) { // dumb linter
      const res = await this.reactionService.unreact(this.reaction.id, this.confessionId);
      this.onReactionChange.emit();
    }
  }

  private async _updateReaction(type: ReactionType) {
    if (this.reaction) { // dumb linter
      const newReaction = await this.reactionService.updateReaction(this.reaction.id, type);
      this.onReactionChange.emit(newReaction);
    }
  }

}
