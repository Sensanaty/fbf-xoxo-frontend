import Controller from '@ember/controller';
import {action} from "@ember/object";

export default class ScoreboardController extends Controller {
  @action resetScore() {
    this.model.score.wins = 0;
    this.model.score.draws = 0;
    this.model.score.losses = 0;
    localStorage.setItem("wins", 0);
    localStorage.setItem("draws", 0);
    localStorage.setItem("losses", 0);
    window.location.reload(true);
  }
}
