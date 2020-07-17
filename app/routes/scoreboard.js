import Route from '@ember/routing/route';

export default class ScoreboardRoute extends Route {
  async model() {
    return {
      localScore: this.store.findRecord('local-score', 1),
      score: this.store.findAll('score')
    }
  }
}
