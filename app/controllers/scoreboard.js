import Controller from '@ember/controller';
import {tracked} from "@glimmer/tracking";
import { action } from '@ember/object';

export default class ScoreboardController extends Controller {

  @action
  changeWin(amount) {
    this.store.findRecord("local-score", 1).then((score) => {
      score.wins = 2
      score.save();
    })
  }

  @action
  changeDraw(amount) {
    this.store.findRecord("local-score", 1).then((score) => {
      score.draws += amount;
      score.draws.save();
    })
  }

  @action
  changeLoss(amount) {
    this.store.findRecord("local-score", 1).then((score) => {
      score.losses += amount;
      score.save();
    })
  }
}
