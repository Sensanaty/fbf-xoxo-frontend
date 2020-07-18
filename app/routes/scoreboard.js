import Route from '@ember/routing/route';

export default class ScoreboardRoute extends Route {
  model() {
    return {
      localScore: {
        username: localStorage.getItem("username") || "Anonymous",
        wins: localStorage.getItem("wins") || 0,
        losses: localStorage.getItem("losses") || 0,
        draws: localStorage.getItem("draws") || 0,
      },
      score: this.store.peekAll("score")
    }
  }
}
